import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// URL du projet Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;

// Client Supabase pour le frontend
export const supabase = createClient(supabaseUrl, publicAnonKey);

// URL de l'API serveur
export const API_URL = `${supabaseUrl}/functions/v1/server`;

async function getAccessToken(): Promise<string> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    return session.access_token;
  }

  const { data, error } = await supabase.auth.refreshSession();
  if (!error && data.session?.access_token) {
    return data.session.access_token;
  }

  return publicAnonKey;
}

// Helper pour les requêtes API avec authentification
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const buildHeaders = async () => {
    const headers = new Headers(options.headers);
    const accessToken = await getAccessToken();
    headers.set('apikey', publicAnonKey);
    headers.set('Authorization', `Bearer ${accessToken}`);
    headers.set('Content-Type', 'application/json');
    return headers;
  };

  let headers = await buildHeaders();
  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    await supabase.auth.refreshSession();
    headers = await buildHeaders();
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  }

  return response;
}
