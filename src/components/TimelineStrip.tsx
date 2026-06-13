import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { COUNTRY_COLORS, ERAS, WORLD_CUPS } from '../data';
import SoccerBall from './SoccerBall';

interface TimelineStripProps {
  selectedIndex: number | null;
  onSelect: (idx: number) => void;
}

const TimelineStrip = forwardRef<HTMLDivElement, TimelineStripProps>(
  function TimelineStrip({ selectedIndex, onSelect }, ref) {
    const innerRef = useRef<HTMLDivElement>(null);
    const drag = useRef({ on: false, sx: 0, sl: 0, moved: false });

    const setRefs = useCallback((node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }, [ref]);

    /* Vertical wheel → horizontal scroll */
    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      const handle = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      };
      el.addEventListener('wheel', handle, { passive: false });
      return () => el.removeEventListener('wheel', handle);
    }, []);

    /* Mouse drag scroll */
    const onMouseDown = (e: React.MouseEvent) => {
      drag.current = { on: true, sx: e.pageX, sl: innerRef.current!.scrollLeft, moved: false };
      innerRef.current!.style.cursor = 'grabbing';
    };
    useEffect(() => {
      const onMove = (e: MouseEvent) => {
        const d = drag.current;
        if (!d.on) return;
        const dx = e.pageX - d.sx;
        if (Math.abs(dx) > 4) d.moved = true;
        innerRef.current!.scrollLeft = d.sl - dx;
      };
      const onUp = () => {
        drag.current.on = false;
        if (innerRef.current) innerRef.current.style.cursor = 'grab';
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      return () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
    }, []);

    /* Group tournaments by era */
    const groups = useMemo(() => {
      const result: Array<{ era: string; items: Array<typeof WORLD_CUPS[0] & { gi: number }> }> = [];
      let currentEra: string | null = null;
      WORLD_CUPS.forEach((wc, i) => {
        if (wc.era !== currentEra) {
          result.push({ era: wc.era, items: [] });
          currentEra = wc.era;
        }
        result[result.length - 1].items.push({ ...wc, gi: i });
      });
      return result;
    }, []);

    return (
      <div className="timeline-wrapper">
        <div className="timeline-scroll" ref={setRefs} onMouseDown={onMouseDown}>
          <div className="timeline-track">
            {groups.map((grp, gi) => (
              <div key={grp.era} style={{ display: 'flex', alignItems: 'flex-start' }}>
                {gi > 0 && (
                  <div className="era-sep" aria-hidden="true">
                    {gi === 1 && <span className="era-sep-label">WWII</span>}
                    <span className="era-sep-line" />
                  </div>
                )}
                <div className="era-group">
                  <div className="era-label">
                    {ERAS.find(e => e.id === grp.era)?.label}
                  </div>
                  <div className="era-markers">
                    <div className="marker-line" aria-hidden="true" />
                    {grp.items.map(item => {
                      const isSelected = selectedIndex === item.gi;
                      const shortYear = `'${String(item.year).slice(2)}`;
                      return (
                        <button
                          key={item.year}
                          className={`marker${isSelected ? ' selected' : ''}`}
                          data-idx={item.gi}
                          onClick={() => { if (!drag.current.moved) onSelect(item.gi); }}
                          aria-label={`${item.year} World Cup, hosted in ${item.host}, won by ${item.winner}`}
                          aria-pressed={isSelected}
                        >
                          <div className="marker-dot">
                            <SoccerBall variant="classic" className="marker-ball" />
                            {isSelected && <div className="marker-glow" aria-hidden="true" />}
                          </div>
                          <span className="marker-year">{shortYear}</span>
                          <span className="marker-country">{item.winner}</span>
                          <div
                            className="marker-flag"
                            style={{ background: COUNTRY_COLORS[item.winner]?.[0] ?? '#888' }}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default TimelineStrip;
