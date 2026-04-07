import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// URL du projet Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;

// Client Supabase pour le frontend
export const supabase = createClient(supabaseUrl, publicAnonKey);

// URL de l'API serveur
export const API_URL = `${supabaseUrl}/functions/v1/server`;

// Helper pour les requêtes API avec authentification
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);
  
  // Utiliser toujours le publicAnonKey pour accéder à la fonction Edge
  // Car c'est le seul token configuré pour accéder aux fonctions par défaut
  headers.set('Authorization', `Bearer ${publicAnonKey}`);
  headers.set('Content-Type', 'application/json');

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}
