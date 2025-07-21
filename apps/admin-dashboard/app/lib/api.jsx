export async function apiGet(path) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, { cache: 'no-cache' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPut(path, body) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path, body) { }

export async function apiDelete(path) {  }