import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'apikey', 'X-Client-Info'],
}));
app.use('*', logger(console.log));

// Supabase client with service role (pour l'admin)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// ============================================
// AUTHENTIFICATION ROUTES
// ============================================

// Inscription utilisateur
app.post('/server/auth/signup', async (c) => {
  try {
    const { email, password, name, company } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Email, mot de passe et nom requis' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, company: company || '' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Error during signup for ${email}: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      success: true, 
      user: { 
        id: data.user?.id, 
        email: data.user?.email,
        name: data.user?.user_metadata?.name 
      } 
    });
  } catch (error) {
    console.log(`Signup error: ${error}`);
    return c.json({ error: 'Erreur lors de l\'inscription' }, 500);
  }
});

// Connexion (géré côté client avec Supabase)
// Vérification de session (utilisé pour vérifier l'auth)
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

// ============================================
// GESTION DES CRÉNEAUX (ADMIN ONLY)
// ============================================

// Récupérer l'utilisateur à partir du token d'accès
const getUserFromAccessToken = async (accessToken: string | undefined) => {
  if (!accessToken) return null;

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) return null;

  return user;
};

// Vérifier si l'utilisateur est admin
const isAdmin = async (accessToken: string | undefined): Promise<boolean> => {
  const user = await getUserFromAccessToken(accessToken);
  if (!user) return false;
  
  // L'admin est identifié par son email
  return user.email === 'contactus@novakom.tech';
};

// Ajouter des créneaux disponibles (ADMIN)
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

    // Créer les créneaux dans le KV store
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

// Supprimer un créneau (ADMIN)
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

// Récupérer tous les créneaux disponibles (PUBLIC)
app.get('/server/slots/available', async (c) => {
  try {
    const allSlots = await kv.getByPrefix('slot_');
    
    // Filtrer uniquement les créneaux disponibles et futurs
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

// Récupérer TOUS les créneaux (ADMIN)
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

// ============================================
// GESTION DES RENDEZ-VOUS
// ============================================

// Créer un rendez-vous (AUTHENTIFIÉ)
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

    // Vérifier si le créneau est disponible
    const slotKey = `slot_${date}_${time}`;
    const slot = await kv.get(slotKey);

    if (!slot) {
      return c.json({ error: 'Créneau inexistant' }, 404);
    }

    if (!slot.available) {
      return c.json({ error: 'Créneau déjà réservé' }, 400);
    }

    // Créer le rendez-vous
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

    // Marquer le créneau comme non disponible
    await kv.set(slotKey, { ...slot, available: false, appointmentId });

    return c.json({ success: true, appointment });
  } catch (error) {
    console.log(`Error creating appointment: ${error}`);
    return c.json({ error: 'Erreur lors de la création du rendez-vous' }, 500);
  }
});

// Récupérer les rendez-vous de l'utilisateur connecté
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

// Récupérer tous les rendez-vous (ADMIN)
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

// Supprimer un rendez-vous (ADMIN)
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

// ============================================
// GESTION DES AVIS CLIENTS
// ============================================

// Créer un avis (AUTHENTIFIÉ)
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
      approved: false // Les avis doivent être approuvés par l'admin
    };

    await kv.set(reviewKey, review);

    return c.json({ success: true, review });
  } catch (error) {
    console.log(`Error creating review: ${error}`);
    return c.json({ error: 'Erreur lors de la création de l\'avis' }, 500);
  }
});

// Récupérer tous les avis approuvés (PUBLIC)
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

// Récupérer TOUS les avis (ADMIN)
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

// Approuver un avis (ADMIN)
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

// Modifier un avis (ADMIN)
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

// Supprimer un avis (ADMIN)
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

// Route de test
app.get('/server/health', (c) => {
  return c.json({ status: 'ok', message: 'NovaKom Server is running' });
});

Deno.serve(app.fetch);
