export async function schemaBodyParser(request, schema){
  const body = await request.json();
  const dto = schema.parse(body);
  return dto
}

export function schemaUrlParser(request){
  const url = new URL(request.url)
  const raw = Object.fromEntries(url.searchParams.entries())
  return raw;
}
