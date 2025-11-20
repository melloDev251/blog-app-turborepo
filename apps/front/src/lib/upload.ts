import { createClient } from "@supabase/supabase-js";

export async function uploadThumbnail(image: File) {
  const supabaseUrl =
    process.env.SUPABASE_URL! || "https://nyacwcdboadtzhdyaerb.supabase.co";
  const supabaseKey =
    process.env.SUPABASE_API_KEY! ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55YWN3Y2Rib2FkdHpoZHlhZXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1ODcyMjksImV4cCI6MjA3OTE2MzIyOX0.6f9YB1U8YSwSh5DOabmiSPkVueVAzUlN2jTYKf9KuOI";

  const supabase = createClient(supabaseUrl, supabaseKey);

  const data = await supabase.storage
    .from("thumbnails")
    .upload(`${image.name}_${Date.now()}`, image);

  console.log({ data });

  if (!data.data?.path) throw new Error("failed to upload the file");
  const urlData = await supabase.storage
    .from("thumbnails")
    .getPublicUrl(data.data?.path);

  return urlData.data.publicUrl;
}
