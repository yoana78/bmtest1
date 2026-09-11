import { requireAdmin } from '../_auth.js';
import defaults from '../_defaults.json';

// POST /api/reset — 모든 브랜드/제품/설정을 원본 기본값으로 되돌림 (관리자 전용)
export async function onRequestPost(context) {
  const unauthorized = requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env } = context;

  await env.DB.batch([
    env.DB.prepare('DELETE FROM brands'),
    env.DB.prepare('DELETE FROM products'),
    env.DB.prepare('DELETE FROM site_settings'),
    ...defaults.brands.map((b, idx) =>
      env.DB.prepare('INSERT INTO brands (id, data, position) VALUES (?, ?, ?)').bind(b.id, JSON.stringify(b), idx)
    ),
    ...defaults.products.map((p, idx) =>
      env.DB.prepare('INSERT INTO products (id, data, position) VALUES (?, ?, ?)').bind(p.id, JSON.stringify(p), idx)
    ),
    env.DB.prepare('INSERT INTO site_settings (key, data) VALUES (\'settings\', ?)').bind(JSON.stringify(defaults.siteSettings))
  ]);

  return Response.json({ ok: true });
}
