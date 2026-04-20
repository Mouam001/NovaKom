import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// URL du projet Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;

// Client Supabase pour le frontend
export const supabase = createClient(supabaseUrl, publicAnonKey);

// URL de l'API serveur
export const API_URL = `${supabaseUrl}/functions/v1/server`;

async function getAccessToken(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Pas de session locale: ne pas tenter de refresh (sinon boucle/429)
  if (!session) {
    return null;
  }

  if (session.access_token) {
    return session.access_token;
  }

  const { data, error } = await supabase.auth.refreshSession();
  return !error && data.session?.access_token ? data.session.access_token : null;
}

// Helper pour les requêtes API avec authentification
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const buildHeaders = async (forcedToken?: string | null) => {
    const headers = new Headers(options.headers);
    const accessToken = forcedToken !== undefined ? forcedToken : await getAccessToken();
    headers.set('apikey', publicAnonKey);
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    } else {
      headers.delete('Authorization');
    }
    headers.set('Content-Type', 'application/json');
    return { headers, accessToken };
  };

  let { headers, accessToken } = await buildHeaders();
  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && accessToken) {
    const { data, error } = await supabase.auth.refreshSession();
    if (error || !data.session?.access_token) {
      return response;
    }

    ({ headers } = await buildHeaders(data.session.access_token));
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  }

  return response;
}
