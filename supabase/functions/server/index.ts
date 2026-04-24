import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const app = new Hono();

const escapeHtml = (str: string) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Middleware globaux: CORS et logs.
app.use('*', cors({
  origin: ['https://www.novakom.tech', 'http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'apikey', 'X-Client-Info'],
}));
app.use('*', logger(console.log));

// Client Supabase avec rôle service pour les opérations backend.
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// --- Authentification ---

// Vérifie la validité du token d'accès côté API.
app.get('/server/auth/verify', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Token manquant' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      console.log(`Auth verification error: ${error?.message}`);
      return c.json({ error: 'Non autorisé' }, 401);
    }

    return c.json({ 
      success: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
        company: user.user_metadata?.company
      }
    });
  } catch (error) {
    console.log(`Verification error: ${error}`);
    return c.json({ error: 'Erreur de vérification' }, 500);
  }
});

// --- Gestion des créneaux (admin) ---

// Récupère l'utilisateur associé au token d'accès.
const getUserFromAccessToken = async (accessToken: string | undefined) => {
  if (!accessToken) return null;

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) return null;

  return user;
};

// Vérifie les droits administrateur.
const isAdmin = async (accessToken: string | undefined): Promise<boolean> => {
  const user = await getUserFromAccessToken(accessToken);
  if (!user) return false;
  
  // Règle actuelle: compte admin identifié par son email.
  return user.email === 'contactus@novakom.tech';
};

// Crée des créneaux disponibles.
app.post('/server/slots/create', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!await isAdmin(accessToken)) {
      return c.json({ error: 'Accès réservé aux administrateurs' }, 403);
    }

    const { slots } = await c.req.json();

    if (!slots || !Array.isArray(slots)) {
      return c.json({ error: 'Format de créneaux invalide' }, 400);
    }

    // Écrit les créneaux dans le KV store.
    const keys = slots.map((slot: any) => `slot_${slot.date}_${slot.time}`);
    const values = slots.map((slot: any) => ({
      date: slot.date,
      time: slot.time,
      available: true,
    }));

    await kv.mset(keys, values);

    return c.json({ success: true, count: slots.length });
  } catch (error) {
    console.log(`Error creating slots: ${error}`);
    return c.json({ error: 'Erreur lors de la création des créneaux' }, 500);
  }
});

// Supprime un créneau.
app.delete('/server/slots/:date/:time', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!await isAdmin(accessToken)) {
      return c.json({ error: 'Accès réservé aux administrateurs' }, 403);
    }

    const { date, time } = c.req.param();
    const key = `slot_${date}_${time}`;

    await kv.del(key);

    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting slot: ${error}`);
    return c.json({ error: 'Erreur lors de la suppression du créneau' }, 500);
  }
});

// Retourne les créneaux disponibles visibles publiquement.
app.get('/server/slots/available', async (c) => {
  try {
    const allSlots = await kv.getByPrefix('slot_');
    
    // Conserve uniquement les créneaux disponibles et non passés.
    const now = new Date();
    const availableSlots = allSlots
      .filter((slot: any) => slot.available)
      .filter((slot: any) => {
        const slotDate = new Date(slot.date);
        return slotDate >= now;
      })
      .sort((a: any, b: any) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA.getTime() - dateB.getTime();
      });

    return c.json({ slots: availableSlots });
  } catch (error) {
    console.log(`Error fetching available slots: ${error}`);
    return c.json({ error: 'Erreur lors de la récupération des créneaux' }, 500);
  }
});

// Retourne tous les créneaux pour l'interface admin.
app.get('/server/slots/all', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!await isAdmin(accessToken)) {
      return c.json({ error: 'Accès réservé aux administrateurs' }, 403);
    }

    const allSlots = await kv.getByPrefix('slot_');
    
    const sortedSlots = allSlots.sort((a: any, b: any) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    return c.json({ slots: sortedSlots });
  } catch (error) {
    console.log(`Error fetching all slots: ${error}`);
    return c.json({ error: 'Erreur lors de la récupération des créneaux' }, 500);
  }
});

// --- Gestion des rendez-vous ---

// Crée un rendez-vous pour un utilisateur authentifié.
app.post('/server/appointments/create', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const user = await getUserFromAccessToken(accessToken);

    if (!user) {
      return c.json({ error: 'Vous devez être connecté pour prendre un rendez-vous' }, 401);
    }

    const { name, email, phone, date, time, message } = await c.req.json();

    if (!phone || !date || !time) {
      return c.json({ error: 'Tous les champs sont requis' }, 400);
    }

    // Vérifie la disponibilité du créneau.
    const slotKey = `slot_${date}_${time}`;
    const slot = await kv.get(slotKey);

    if (!slot) {
      return c.json({ error: 'Créneau inexistant' }, 404);
    }

    if (!slot.available) {
      return c.json({ error: 'Créneau déjà réservé' }, 400);
    }

    // Enregistre le rendez-vous.
    const appointmentId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const appointmentKey = `appointment_${appointmentId}`;
    
    const appointment = {
      id: appointmentId,
      userId: user.id,
      name: name || user.user_metadata?.name || user.email || 'Client',
      email: user.email || email || '',
      phone,
      date,
      time,
      message: message || '',
      createdAt: new Date().toISOString()
    };

    await kv.set(appointmentKey, appointment);

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'NovaKom <contactus@novakom.tech>',
          to: appointment.email,
          subject: '✅ Votre rendez-vous NovaKom est confirmé',
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto"><h2 style="color:#ff6b35">Rendez-vous confirmé !</h2><p>Bonjour <strong>${escapeHtml(appointment.name)}</strong>,</p><p>Votre rendez-vous a bien été enregistré :</p><div style="background:#f5f5f5;padding:20px;border-radius:8px;margin:20px 0"><p>📅 <strong>Date :</strong> ${escapeHtml(appointment.date)}</p><p>🕐 <strong>Heure :</strong> ${escapeHtml(appointment.time)}</p></div><p>Notre équipe reviendra vers vous rapidement.</p><p style="color:#888;font-size:12px">NovaKom — contactus@novakom.tech</p></div>`
        })
      });
    } catch (emailError) {
      console.log('Erreur envoi email RDV:', emailError);
    }

    // Marque le créneau comme réservé.
    await kv.set(slotKey, { ...slot, available: false, appointmentId });

    return c.json({ success: true, appointment });
  } catch (error) {
    console.log(`Error creating appointment: ${error}`);
    return c.json({ error: 'Erreur lors de la création du rendez-vous' }, 500);
  }
});

// Retourne les rendez-vous de l'utilisateur connecté.
app.get('/server/appointments/my', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const user = await getUserFromAccessToken(accessToken);

    if (!user) {
      return c.json({ error: 'Non autorisé' }, 401);
    }

    const appointments = await kv.getByPrefix('appointment_');
    const myAppointments = appointments
      .filter((apt: any) => apt.userId === user.id)
      .sort((a: any, b: any) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB.getTime() - dateA.getTime();
      });

    return c.json({ appointments: myAppointments });
  } catch (error) {
    console.log(`Error fetching my appointments: ${error}`);
    return c.json({ error: 'Erreur lors de la récupération de vos rendez-vous' }, 500);
  }
});

// Retourne tous les rendez-vous pour l'admin.
app.get('/server/appointments/all', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!await isAdmin(accessToken)) {
      return c.json({ error: 'Accès réservé aux administrateurs' }, 403);
    }

    const appointments = await kv.getByPrefix('appointment_');
    
    const sortedAppointments = appointments.sort((a: any, b: any) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });

    return c.json({ appointments: sortedAppointments });
  } catch (error) {
    console.log(`Error fetching appointments: ${error}`);
    return c.json({ error: 'Erreur lors de la récupération des rendez-vous' }, 500);
  }
});

// Supprime un rendez-vous et libère le créneau associé.
app.delete('/server/appointments/:appointmentId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!await isAdmin(accessToken)) {
      return c.json({ error: 'Accès réservé aux administrateurs' }, 403);
    }

    const { appointmentId } = c.req.param();
    const appointmentKey = `appointment_${appointmentId}`;
    const appointment = await kv.get(appointmentKey);

    if (!appointment) {
      return c.json({ error: 'Rendez-vous non trouvé' }, 404);
    }

    await kv.del(appointmentKey);

    if ((appointment as any).date && (appointment as any).time) {
      const slotKey = `slot_${(appointment as any).date}_${(appointment as any).time}`;
      const slot = await kv.get(slotKey);
      if (slot) {
        await kv.set(slotKey, { ...slot, available: true, appointmentId: undefined });
      }
    }

    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting appointment: ${error}`);
    return c.json({ error: 'Erreur lors de la suppression du rendez-vous' }, 500);
  }
});

// --- Gestion des avis clients ---

// Crée un avis soumis par un utilisateur authentifié.
app.post('/server/reviews/create', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const user = await getUserFromAccessToken(accessToken);

    if (!user) {
      return c.json({ error: 'Vous devez être connecté pour laisser un avis' }, 401);
    }

    const { message, rating, company } = await c.req.json();

    if (!message) {
      return c.json({ error: 'Message requis' }, 400);
    }

    const parsedRating = Number.parseInt(String(rating ?? 0), 10);
    const normalizedRating = Number.isNaN(parsedRating)
      ? 0
      : Math.max(0, Math.min(5, parsedRating));

    const reviewId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const reviewKey = `review_${reviewId}`;
    
    const review = {
      id: reviewId,
      userId: user.id,
      userName: user.user_metadata?.name || user.email || 'Utilisateur',
      userEmail: user.email || '',
      company: company || '',
      message,
      rating: normalizedRating,
      createdAt: new Date().toISOString(),
      approved: false // Les avis sont modérés avant publication.
    };

    await kv.set(reviewKey, review);

    return c.json({ success: true, review });
  } catch (error) {
    console.log(`Error creating review: ${error}`);
    return c.json({ error: 'Erreur lors de la création de l\'avis' }, 500);
  }
});

// Retourne les avis approuvés visibles publiquement.
app.get('/server/reviews/approved', async (c) => {
  try {
    const allReviews = await kv.getByPrefix('review_');
    
    const approvedReviews = allReviews
      .filter((review: any) => review.approved)
      .sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    return c.json({ reviews: approvedReviews });
  } catch (error) {
    console.log(`Error fetching approved reviews: ${error}`);
    return c.json({ error: 'Erreur lors de la récupération des avis' }, 500);
  }
});

// Retourne tous les avis pour l'interface admin.
app.get('/server/reviews/all', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!await isAdmin(accessToken)) {
      return c.json({ error: 'Accès réservé aux administrateurs' }, 403);
    }

    const allReviews = await kv.getByPrefix('review_');
    
    const sortedReviews = allReviews.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({ reviews: sortedReviews });
  } catch (error) {
    console.log(`Error fetching all reviews: ${error}`);
    return c.json({ error: 'Erreur lors de la récupération des avis' }, 500);
  }
});

// Approuve un avis et, si fourni, met à jour sa note.
app.patch('/server/reviews/:reviewId/approve', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!await isAdmin(accessToken)) {
      return c.json({ error: 'Accès réservé aux administrateurs' }, 403);
    }

    const { reviewId } = c.req.param();
    const reviewKey = `review_${reviewId}`;
    let ratingFromAdmin: number | null = null;

    try {
      const body = await c.req.json();
      if (body && body.rating !== undefined) {
        const parsedRating = Number.parseInt(String(body.rating), 10);
        if (!Number.isNaN(parsedRating)) {
          ratingFromAdmin = Math.max(0, Math.min(5, parsedRating));
        }
      }
    } catch {
      ratingFromAdmin = null;
    }
    
    const review = await kv.get(reviewKey);

    if (!review) {
      return c.json({ error: 'Avis non trouvé' }, 404);
    }

    const reviewRating = Number.parseInt(String((review as any).rating ?? 0), 10);
    const normalizedExistingRating = Number.isNaN(reviewRating)
      ? 0
      : Math.max(0, Math.min(5, reviewRating));

    await kv.set(reviewKey, {
      ...review,
      rating: ratingFromAdmin ?? normalizedExistingRating,
      approved: true
    });

    return c.json({ success: true });
  } catch (error) {
    console.log(`Error approving review: ${error}`);
    return c.json({ error: 'Erreur lors de l\'approbation de l\'avis' }, 500);
  }
});

// Met à jour le contenu d'un avis.
app.patch('/server/reviews/:reviewId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!await isAdmin(accessToken)) {
      return c.json({ error: 'Accès réservé aux administrateurs' }, 403);
    }

    const { reviewId } = c.req.param();
    const reviewKey = `review_${reviewId}`;
    const review = await kv.get(reviewKey);

    if (!review) {
      return c.json({ error: 'Avis non trouvé' }, 404);
    }

    const payload = await c.req.json();
    const nextRating = Number.parseInt(String(payload?.rating ?? (review as any).rating ?? 0), 10);
    const normalizedRating = Number.isNaN(nextRating) ? 0 : Math.max(0, Math.min(5, nextRating));
    const message = typeof payload?.message === 'string' ? payload.message.trim() : (review as any).message;

    if (!message) {
      return c.json({ error: 'Le message de l\'avis ne peut pas être vide' }, 400);
    }

    const updatedReview = {
      ...review,
      userName: typeof payload?.userName === 'string' ? payload.userName : (review as any).userName,
      company: typeof payload?.company === 'string' ? payload.company : (review as any).company,
      message,
      rating: normalizedRating,
    };

    await kv.set(reviewKey, updatedReview);

    return c.json({ success: true, review: updatedReview });
  } catch (error) {
    console.log(`Error updating review: ${error}`);
    return c.json({ error: 'Erreur lors de la modification de l\'avis' }, 500);
  }
});

// Supprime un avis.
app.delete('/server/reviews/:reviewId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!await isAdmin(accessToken)) {
      return c.json({ error: 'Accès réservé aux administrateurs' }, 403);
    }

    const { reviewId } = c.req.param();
    const reviewKey = `review_${reviewId}`;

    await kv.del(reviewKey);

    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting review: ${error}`);
    return c.json({ error: 'Erreur lors de la suppression de l\'avis' }, 500);
  }
});

// Endpoint de santé.
app.get('/server/health', (c) => {
  return c.json({ status: 'ok', message: 'NovaKom Server is running' });
});

Deno.serve(app.fetch);
