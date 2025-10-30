// src/services/storage.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Variables de entorno Supabase no configuradas");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadFile(file) {
  try {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("uploads")
      .upload(fileName, file, { upsert: false });

    if (error) throw error;

    // obtener la URL pública
    const { data: publicData } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    // 👇 lo devolvemos con la misma forma que el backend
    return { path: publicData.publicUrl };
  } catch (err) {
    console.error("Error en uploadFile:", err);
    throw err;
  }
}

export default supabase;
