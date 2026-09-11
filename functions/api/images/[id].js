// GET /api/images/:id — 업로드된 이미지를 그대로 서빙 (공개, 인증 불필요 — 홈페이지 방문자 전체가 봐야 하므로)
export async function onRequestGet(context) {
  const { env, params } = context;

  if (env.IMAGES) {
    const object = await env.IMAGES.get(params.id);
    if (object) {
      return new Response(object.body, {
        headers: {
          'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      });
    }
  }

  const row = await env.DB.prepare('SELECT mime, data FROM images WHERE id = ?').bind(params.id).first();
  if (!row) return new Response('Not found', { status: 404 });

  const binary = Uint8Array.from(atob(row.data), c => c.charCodeAt(0));
  return new Response(binary, {
    headers: {
      'Content-Type': row.mime,
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  });
}
