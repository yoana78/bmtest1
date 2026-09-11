-- 브랜드/제품/사이트설정을 JSON 문서로 저장하는 단순한 스키마 (homepage와 동일 구조).
-- 각 행은 프론트엔드가 이미 쓰던 브랜드/제품 객체 모양을 그대로 JSON으로 담는다.
-- position 컬럼은 관리자 화면에 보여줄 정렬 순서(추가된 순서, 최신이 위로)를 유지하기 위함.

CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  position INTEGER NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  position INTEGER NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 사이트 설정은 단일 행 하나만 사용 (key = 'settings')
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- R2 없이도 업로드 이미지를 저장할 수 있는 폴백 테이블.
CREATE TABLE IF NOT EXISTS images (
  id TEXT PRIMARY KEY,
  mime TEXT NOT NULL,
  data TEXT NOT NULL, -- base64
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
