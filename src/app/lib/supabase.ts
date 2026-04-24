import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Point d'entrée Supabase du projet.
const supabaseUrl = `https://${projectId}.supabase.co`;

// Client utilisé côté frontend.
export const supabase = createClient(supabaseUrl, publicAnonKey);

// Base URL des fonctions Edge utilisées comme API backend.
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
