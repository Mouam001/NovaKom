import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// URL du projet Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;

// Client Supabase pour le frontend
export const supabase = createClient(supabaseUrl, publicAnonKey);

// URL de l'API serveur
export const API_URL = `${supabaseUrl}/functions/v1/make-server-04c0d8ba`;

// Helper pour les requêtes API avec authentification
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const { data: { session } } = await supabase.auth.getSession();
  
  const headers = new Headers(options.headers);
  
  if (session?.access_token) {
    headers.set('Authorization', `Bearer ${session.access_token}`);
  } else {
    headers.set('Authorization', `Bearer ${publicAnonKey}`);
  }
  
  headers.set('Content-Type', 'application/json');

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}
