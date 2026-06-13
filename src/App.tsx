import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WORLD_CUPS } from './data';
import type { Theme } from './types';
import Header from './components/Header';
import TimelineStrip from './components/TimelineStrip';
import DetailPanel from './components/DetailPanel';
import IntroView from './components/IntroView';
import AboutModal from './components/AboutModal';

export default function App() {
  const { year } = useParams<{ year?: string }>();
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [theme, setTheme] = useState<Theme>('pitch');
  const [detailKey, setDetailKey] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const selectedIndex = useMemo(() => {
    if (!year) return null;
    const idx = WORLD_CUPS.findIndex(wc => wc.year === parseInt(year, 10));
    return idx >= 0 ? idx : null;
  }, [year]);

  const select = useCallback((idx: number | null) => {
    if (idx === null) navigate('/');
    else {
      navigate(`/cup/${WORLD_CUPS[idx].year}`);
      setDetailKey(k => k + 1);
    }
  }, [navigate]);

  const nav = useCallback((dir: 1 | -1) => {
    if (selectedIndex === null) {
      select(dir > 0 ? 0 : WORLD_CUPS.length - 1);
    } else {
      const next = Math.max(0, Math.min(WORLD_CUPS.length - 1, selectedIndex + dir));
      select(next);
    }
  }, [selectedIndex, select]);

  /* Keyboard: ← → navigate, Escape close */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (showAbout) {
        if (e.key === 'Escape') setShowAbout(false);
        return;
      }
      if (e.key === 'Escape') { navigate('/'); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); nav(1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); nav(-1); }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [showAbout, nav, navigate]);

  /* Auto-scroll timeline to center selected marker */
  useEffect(() => {
    if (selectedIndex === null || !timelineRef.current) return;
    const el = timelineRef.current.querySelector<HTMLElement>(`[data-idx="${selectedIndex}"]`);
    if (!el) return;
    const cRect = timelineRef.current.getBoundingClientRect();
    const mRect = el.getBoundingClientRect();
    const target = timelineRef.current.scrollLeft + (mRect.left - cRect.left)
      - (cRect.width / 2) + (mRect.width / 2);
    timelineRef.current.scrollTo({ left: target, behavior: 'smooth' });
  }, [selectedIndex]);

  const selected = selectedIndex !== null ? WORLD_CUPS[selectedIndex] : null;

  return (
    <div className={`app theme-${theme}`}>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'pitch' ? 'night' : 'pitch')}
        onAbout={() => setShowAbout(true)}
      />

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      <TimelineStrip
        ref={timelineRef}
        selectedIndex={selectedIndex}
        onSelect={idx => select(idx)}
      />

      <main className="detail-area">
        {selected ? (
          <DetailPanel
            key={detailKey}
            data={selected}
            index={selectedIndex!}
            total={WORLD_CUPS.length}
            onPrev={() => nav(-1)}
            onNext={() => nav(1)}
            onClose={() => select(null)}
          />
        ) : (
          <IntroView />
        )}
      </main>
    </div>
  );
}
