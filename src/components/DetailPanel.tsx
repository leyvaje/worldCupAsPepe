import { COUNTRY_COLORS, ERAS, WORLD_CUPS } from '../data';
import type { WorldCup } from '../types';

interface DetailPanelProps {
  data: WorldCup;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export default function DetailPanel({ data, index, total, onPrev, onNext, onClose }: DetailPanelProps) {
  const era = ERAS.find(e => e.id === data.era);
  const accentColor = COUNTRY_COLORS[data.winner]?.[0] ?? '#c9a84c';
  const flagColor = COUNTRY_COLORS[data.winner]?.[0] ?? '#888';

  const prevCup = index > 0 ? WORLD_CUPS[index - 1] : null;
  const nextCup = index < total - 1 ? WORLD_CUPS[index + 1] : null;

  return (
    <div className="detail-panel">
      <div className="detail-accent-bar" style={{ background: accentColor }} aria-hidden="true" />
      <div className="detail-watermark" aria-hidden="true">{data.year}</div>

      <button className="detail-close" onClick={onClose} aria-label="Close detail panel">✕</button>

      <div className="detail-header">
        <div className="detail-host">
          <span className="detail-host-label">Hosted in</span>
          <span className="detail-host-name">{data.host}</span>
        </div>
        {era && <span className="detail-era-badge">{era.label}</span>}
      </div>

      <div className="detail-grid">
        <div className="info-card" style={{ '--delay': '0.1s' } as React.CSSProperties}>
          <div className="info-card-icon" aria-hidden="true">★</div>
          <div className="info-card-label">Champion</div>
          <div
            className="champion-flag"
            style={{
              background: flagColor,
              boxShadow: `0 0 12px ${flagColor}40`,
            }}
            aria-hidden="true"
          />
          <span className="champion-name">{data.winner}</span>
          <span className="score-line">{data.score}</span>
          <span className="vs-line">vs {data.runnerUp}</span>
        </div>

        <div className="info-card" style={{ '--delay': '0.2s' } as React.CSSProperties}>
          <div className="info-card-icon" aria-hidden="true">✦</div>
          <div className="info-card-label">
            {data.mvpType === 'Golden Ball' ? 'Golden Ball' : 'Star Player'}
          </div>
          <span className="mvp-name">{data.mvp}</span>
          <span className="mvp-country">{data.mvpCountry}</span>
          {data.mvpType === 'Golden Ball' && (
            <span className="mvp-official">Official Award</span>
          )}
        </div>

        <div className="info-card" style={{ '--delay': '0.3s' } as React.CSSProperties}>
          <div className="info-card-icon" aria-hidden="true">◆</div>
          <div className="info-card-label">The Story</div>
          <p className="story-text">{data.fact}</p>
        </div>
      </div>

      <nav className="detail-nav" aria-label="Tournament navigation">
        <button
          className="nav-btn"
          onClick={onPrev}
          disabled={!prevCup}
          aria-label={prevCup ? `Previous: ${prevCup.year} ${prevCup.host}` : 'No previous tournament'}
        >
          <span className="nav-arrow" aria-hidden="true">‹</span>
          {prevCup && <span className="nav-hint">{prevCup.year} {prevCup.host}</span>}
        </button>

        <span className="nav-counter" aria-label={`Tournament ${index + 1} of ${total}`}>
          {index + 1} / {total}
        </span>

        <button
          className="nav-btn nav-btn-next"
          onClick={onNext}
          disabled={!nextCup}
          aria-label={nextCup ? `Next: ${nextCup.year} ${nextCup.host}` : 'No next tournament'}
        >
          {nextCup && <span className="nav-hint">{nextCup.year} {nextCup.host}</span>}
          <span className="nav-arrow" aria-hidden="true">›</span>
        </button>
      </nav>
    </div>
  );
}
