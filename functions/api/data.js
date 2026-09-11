// GET /api/data — 누구나 접근 가능한 공개 읽기 엔드포인트.
// 브랜드/제품/사이트설정을 한 번에 내려줘서, 홈페이지가 로드될 때 이 응답으로 화면을 채운다.
export async function onRequestGet(context) {
  const { env } = context;

  const [brandsResult, productsResult, settingsResult] = await Promise.all([
    env.DB.prepare('SELECT data FROM brands ORDER BY position ASC').all(),
    env.DB.prepare('SELECT data FROM products ORDER BY position ASC').all(),
    env.DB.prepare('SELECT data FROM site_settings WHERE key = ?').bind('settings').first()
  ]);

  const brands = brandsResult.results.map(row => JSON.parse(row.data));
  const products = productsResult.results.map(row => JSON.parse(row.data));
  const siteSettings = settingsResult ? JSON.parse(settingsResult.data) : {};

  return Response.json({ brands, products, siteSettings }, {
    headers: { 'Cache-Control': 'no-store' }
  });
}
