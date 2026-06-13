import { useMemo } from 'react';
import { COUNTRY_COLORS, WORLD_CUPS } from '../data';

export default function IntroView() {
  const champions = useMemo(() => {
    const counts: Record<string, number> = {};
    WORLD_CUPS.forEach(wc => {
      const name = wc.winner === 'West Germany' ? 'Germany' : wc.winner;
      counts[name] = (counts[name] ?? 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);

  const maxCount = champions[0]?.[1] ?? 1;

  return (
    <div className="intro-view">
      <div className="intro-stats">
        <div className="intro-stat">
          <span className="intro-stat-num">22</span>
          <span className="intro-stat-label">Tournaments</span>
        </div>
        <div className="intro-stat">
          <span className="intro-stat-num">{champions.length}</span>
          <span className="intro-stat-label">Champions</span>
        </div>
        <div className="intro-stat">
          <span className="intro-stat-num">92</span>
          <span className="intro-stat-label">Years of Glory</span>
        </div>
      </div>

      <p className="intro-prompt">Select a year above to explore — or use ← → arrow keys</p>

      <div className="intro-champions" role="list" aria-label="All-time champions">
        {champions.map(([name, count]) => {
          const color = COUNTRY_COLORS[name]?.[0] ?? '#888';
          return (
            <div key={name} className="intro-champ" role="listitem">
              <span className="intro-champ-name">{name}</span>
              <div className="intro-champ-bar-track" aria-hidden="true">
                <div
                  className="intro-champ-bar"
                  style={{ width: `${(count / maxCount) * 100}%`, background: color }}
                />
              </div>
              <span className="intro-champ-count" aria-label={`${count} titles`}>{count}×</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
