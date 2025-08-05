import { createClient } from "../../../../packages/utils/supabase/client.mjs"

export async function uploadFileAndGetUrl(
  file,
  bucket,
  pathPrefix,
  maxSize = 2 * 1024 * 1024,
  metadata = {}
) {

  const supabase = createClient()

  if (!file || !file.name) {
    throw new Error('No valid file provided for upload')
  }

  if (file.size > maxSize) {
    console.log("file too large")
    throw new Error(`File must be under ${Math.round(maxSize/1024/1024)} MB`)
  }

  const ext = file.name.split('.').pop()
  const filename = `${pathPrefix}_${Date.now()}.${ext}`
  console.log("file name", filename)

  const { error: upErr } = await supabase
    .storage
    .from(bucket)
    .upload(filename, file, {
      contentType: file.type,
      upsert: false,
      metadata
    })

  if (upErr) {
    console.log("upload error", upErr.message)
    throw new Error(`Upload failed: ${upErr.message}`)
  }

  const { data: { publicUrl }, error: urlErr } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(filename)

  if (urlErr) {
    console.log("url error", urlErr.message)
    throw new Error(`Cannot retrieve public URL: ${urlErr.message}`)
  }

  return { publicUrl }
}