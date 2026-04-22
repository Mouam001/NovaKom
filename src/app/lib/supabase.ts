import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// URL du projet Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;

// Client Supabase pour le frontend
export const supabase = createClient(supabaseUrl, publicAnonKey);

// URL de l'API serveur
export const API_URL = `${supabaseUrl}/functions/v1/server`;

export async function apiRequest(
    endpoint: string,
    options: RequestInit = {},
    forcedToken?: string
): Promise<Response> {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  let accessToken = forcedToken;

  if (!accessToken) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    accessToken = session?.access_token;
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}