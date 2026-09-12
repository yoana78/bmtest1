import React from 'react';

// siteA 디자인은 제목 일부 단어만 강조(기울임)하는 곳이 있습니다.
// 관리자가 별표로 감싸면(예: 존중은 아주 작고 *사소한* 것에서 시작됩니다)
// 그 부분이 강조 스타일로 표시됩니다. 줄바꿈(엔터)도 그대로 반영됩니다.
export default function RichText({ text, className = '', as: Tag = 'span', ...rest }) {
  const source = String(text || '');
  const parts = source.split(/(\*[^*\n]+\*)/g);

  return (
    <Tag className={`cms-text ${className}`.trim()} {...rest}>
      {parts.map((part, i) =>
        /^\*[^*\n]+\*$/.test(part)
          ? <em key={i}>{part.slice(1, -1)}</em>
          : <React.Fragment key={i}>{part}</React.Fragment>
      )}
    </Tag>
  );
}
