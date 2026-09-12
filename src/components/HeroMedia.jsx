import React from 'react';

// 배너(히어로) 자리의 배경을 그려주는 공용 컴포넌트입니다.
// 관리자가 같은 자리에 사진을 올리면 배경 이미지로, 동영상(mp4)을 올리면
// 소리 없이 반복 재생되는 영상으로 깔립니다.
// 영상은 CSS 배경으로 넣을 수 없어서 <video>를 뒤에 깔고 내용은 그 위에 얹습니다.
export default function HeroMedia({ media, className = '', style, children }) {
  if (media.isVideo) {
    return (
      <section className={className} style={{ ...style, position: 'relative', overflow: 'hidden', backgroundImage: 'none' }}>
        <video
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
        />
        {children}
      </section>
    );
  }

  return (
    <section className={className} style={{ ...style, backgroundImage: `url('${media.src}')` }}>
      {children}
    </section>
  );
}
