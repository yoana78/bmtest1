import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        raf = null;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-progress">
      <span style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
