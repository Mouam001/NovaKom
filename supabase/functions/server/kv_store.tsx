/* Fichier généré automatiquement : à ne modifier qu'en connaissance de cause. */

/* Schéma de table:
CREATE TABLE kv_store_04c0d8ba (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
*/

// Référence table: https://supabase.com/dashboard/project/ggmhoyqhrinpkqdqqzni/database/tables

// Interface clé-valeur utilisée par la fonction serveur.
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const client = () => createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
);

// Enregistre ou met à jour une entrée.
export const set = async (key: string, value: any): Promise<void> => {
  const supabase = client()
  const { error } = await supabase.from("kv_store_04c0d8ba").upsert({
    key,
    value
  });
  if (error) {
    throw new Error(error.message);
  }
};

// Récupère une entrée par clé.
export const get = async (key: string): Promise<any> => {
  const supabase = client()
  const { data, error } = await supabase.from("kv_store_04c0d8ba").select("value").eq("key", key).maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return data?.value;
};

// Supprime une entrée par clé.
export const del = async (key: string): Promise<void> => {
  const supabase = client()
  const { error } = await supabase.from("kv_store_04c0d8ba").delete().eq("key", key);
  if (error) {
    throw new Error(error.message);
  }
};

// Enregistre plusieurs entrées en une requête.
export const mset = async (keys: string[], values: any[]): Promise<void> => {
  const supabase = client()
  const { error } = await supabase.from("kv_store_04c0d8ba").upsert(keys.map((k, i) => ({ key: k, value: values[i] })));
  if (error) {
    throw new Error(error.message);
  }
};

// Récupère plusieurs entrées.
export const mget = async (keys: string[]): Promise<any[]> => {
  const supabase = client()
  const { data, error } = await supabase.from("kv_store_04c0d8ba").select("value").in("key", keys);
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((d) => d.value) ?? [];
};

// Supprime plusieurs entrées.
export const mdel = async (keys: string[]): Promise<void> => {
  const supabase = client()
  const { error } = await supabase.from("kv_store_04c0d8ba").delete().in("key", keys);
  if (error) {
    throw new Error(error.message);
  }
};

// Retourne toutes les entrées correspondant à un préfixe.
export const getByPrefix = async (prefix: string): Promise<any[]> => {
  const supabase = client()
  const { data, error } = await supabase.from("kv_store_04c0d8ba").select("key, value").like("key", prefix + "%");
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((d) => d.value) ?? [];
};
