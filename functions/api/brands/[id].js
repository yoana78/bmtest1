import { requireAdmin } from '../../_auth.js';

// PUT /api/brands/:id — 기존 브랜드 수정 (부분 업데이트, 관리자 전용)
export async function onRequestPut(context) {
  const unauthorized = requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env, params } = context;
  const updates = await context.request.json();

  const existing = await env.DB.prepare('SELECT data FROM brands WHERE id = ?').bind(params.id).first();
  if (!existing) return Response.json({ error: 'Not found' }, { status: 404 });

  const merged = { ...JSON.parse(existing.data), ...updates };
  await env.DB.prepare('UPDATE brands SET data = ?, updated_at = datetime(\'now\') WHERE id = ?')
    .bind(JSON.stringify(merged), params.id)
    .run();

  return Response.json({ ok: true, brand: merged });
}

// DELETE /api/brands/:id — 브랜드 삭제 (관리자 전용)
export async function onRequestDelete(context) {
  const unauthorized = requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env, params } = context;
  await env.DB.prepare('DELETE FROM brands WHERE id = ?').bind(params.id).run();
  return Response.json({ ok: true });
}
