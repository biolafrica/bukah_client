import { createClient } from "@supabase/supabase-js"


export async function uploadFileAndGetUrl(
  file,
  bucket,
  pathPrefix,
  maxSize = 2 * 1024 * 1024,
  metadata = {}
) {

  const supabase = createClient( 
    process.env.NEXT_PUBLIC_SUPABASE_URL,  
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )

  if (file.size > maxSize) {
    throw new Error(`File must be under ${Math.round(maxSize/1024/1024)} MB`)
  }

  const ext = file.name.split('.').pop()
  const filename = `${pathPrefix}_${Date.now()}.${ext}`

  const { error: upErr } = await supabase
    .storage
    .from(bucket)
    .upload(filename, file, {
      contentType: file.type,
      upsert: false,
      metadata
    })

  if (upErr) {
    throw new Error(`Upload failed: ${upErr.message}`)
  }

  const { data: { publicUrl }, error: urlErr } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(filename)

  if (urlErr) {
    throw new Error(`Cannot retrieve public URL: ${urlErr.message}`)
  }

  return { publicUrl }
}