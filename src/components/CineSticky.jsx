import React, { useEffect, useRef, useState } from 'react';

/**
 * 스크롤 시네마틱 섹션.
 * 좌측 이미지는 화면에 고정된 채, 우측 텍스트 블록이 뷰포트 중앙을 지날 때마다
 * 대응하는 이미지로 교차 전환된다.
 */
export default function CineSticky({ blocks }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      // 뷰포트 정중앙 얇은 밴드를 통과하는 블록만 감지
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [blocks.length]);

  return (
    <section className="cine-sticky">
      <div className="cine-sticky-media">
        {blocks.map((b, i) => (
          <figure key={i} className={i === active ? 'on' : ''}>
            <img src={b.image} alt="" />
          </figure>
        ))}
        <div className="cine-media-index">
          {String(active + 1).padStart(2, '0')}
          <sub>/ {String(blocks.length).padStart(2, '0')}</sub>
        </div>
      </div>

      <div className="cine-sticky-text">
        {blocks.map((b, i) => (
          <article
            key={i}
            data-idx={i}
            ref={(el) => (refs.current[i] = el)}
            className="cine-block"
            style={{ opacity: i === active ? 1 : 0.35 }}
          >
            <div className="cine-block-media">
              <img src={b.image} alt="" />
            </div>
            <span className="cine-block-tag">{b.tag}</span>
            <h3>{b.title}</h3>
            <p className="cms-text">{b.body}</p>
            {b.meta && (
              <div className="cine-meta">
                {b.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
