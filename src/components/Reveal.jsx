import React, { useEffect, useRef, useState } from 'react';

/**
 * 스크롤 진입 시 나타나는 래퍼.
 * IntersectionObserver를 기본으로 쓰되, 관찰이 동작하지 않는 환경을 대비해
 * 스크롤/리사이즈 기반 폴백을 함께 둬서 콘텐츠가 숨겨진 채 남지 않도록 한다.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let io = null;
    let raf = null;
    let done = false;

    const show = () => {
      if (done) return;
      done = true;
      setShown(true);
      cleanup();
    };

    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.96 && r.bottom > 0;
    };

    const check = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (inView()) show();
      });
    };

    const cleanup = () => {
      if (io) io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) show();
        },
        { threshold: 0.01 }
      );
      io.observe(el);
    }

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();

    return cleanup;
  }, []);

  const d = delay ? ` d${delay}` : '';
  return (
    <Tag ref={ref} className={`reveal${d}${shown ? ' in' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
