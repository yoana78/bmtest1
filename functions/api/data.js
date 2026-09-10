const KEYS = ['brands', 'products', 'siteSettings'];

export async function onRequestGet({ env }) {
  const entries = await Promise.all(KEYS.map((key) => env.SITE_DATA.get(key)));
  const result = {};
  KEYS.forEach((key, i) => {
    result[key] = entries[i] ? JSON.parse(entries[i]) : null;
  });
  return Response.json(result);
}

export async function onRequestPost({ request, env }) {
  const password = request.headers.get('x-admin-password');
  if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
    return new Response('Unauthorized', { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const writes = KEYS
    .filter((key) => body[key] !== undefined)
    .map((key) => env.SITE_DATA.put(key, JSON.stringify(body[key])));

  await Promise.all(writes);
  return Response.json({ ok: true });
}
