// 관리자 전용(쓰기) API를 보호하는 공용 인증 체크.
// 프론트엔드 어드민 화면은 비밀번호(3051) 로그인 성공 후 그 값을 매 요청마다
// "Authorization: Bearer 3051" 헤더로 실어 보낸다. 서버는 환경변수 ADMIN_PASSWORD와 비교한다.
export function requireAdmin(context) {
  const auth = context.request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!context.env.ADMIN_PASSWORD || token !== context.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null; // 통과
}
