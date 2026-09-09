import React, { useEffect, useState } from 'react';

/** 우측 섹션 진행 인디케이터. sections: [{ id, label }] */
export default function SectionDots({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [sections]);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="section-dots">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`section-dot ${active === s.id ? 'active' : ''}`}
          onClick={() => go(s.id)}
          aria-label={s.label}
        >
          <span>{s.label}</span>
          <i />
        </button>
      ))}
    </div>
  );
}
