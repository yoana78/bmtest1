import { requireAdmin } from '../_auth.js';

// PUT /api/settings — 사이트 설정(문의 이메일, 히어로 이미지 등) 부분 업데이트 (관리자 전용)
export async function onRequestPut(context) {
  const unauthorized = requireAdmin(context);
  if (unauthorized) return unauthorized;

  const { env } = context;
  const updates = await context.request.json();

  const existing = await env.DB.prepare('SELECT data FROM site_settings WHERE key = ?').bind('settings').first();
  const merged = { ...(existing ? JSON.parse(existing.data) : {}), ...updates };

  await env.DB.prepare(
    `INSERT INTO site_settings (key, data, updated_at) VALUES ('settings', ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  ).bind(JSON.stringify(merged)).run();

  return Response.json({ ok: true, siteSettings: merged });
}
