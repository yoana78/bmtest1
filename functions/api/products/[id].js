import { requireAdmin } from '../../_auth.js';

// 제품 id에 한글이 포함된 경우, Cloudflare Pages Functions는 URL 경로의
// %-인코딩을 자동으로 디코딩해주지 않아 params.id가 인코딩된 그대로 들어온다.
// 그대로 두면 DB에 저장된 원래 한글 id와 일치하지 않아 조회에 실패하므로 직접 디코딩한다.
function decodeId(raw) {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

// PUT /api/products/:id — 기존 제품 수정 (부분 업데이트, 관리자 전용)
export async function onRequestPut(context) {
  const unauthorized = requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env, params } = context;
  const id = decodeId(params.id);
  const updates = await context.request.json();

  const existing = await env.DB.prepare('SELECT data FROM products WHERE id = ?').bind(id).first();
  if (!existing) return Response.json({ error: 'Not found' }, { status: 404 });

  const merged = { ...JSON.parse(existing.data), ...updates };
  await env.DB.prepare('UPDATE products SET data = ?, updated_at = datetime(\'now\') WHERE id = ?')
    .bind(JSON.stringify(merged), id)
    .run();

  return Response.json({ ok: true, product: merged });
}

// DELETE /api/products/:id — 제품 삭제 (관리자 전용)
export async function onRequestDelete(context) {
  const unauthorized = requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env, params } = context;
  const id = decodeId(params.id);
  await env.DB.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
  return Response.json({ ok: true });
}
