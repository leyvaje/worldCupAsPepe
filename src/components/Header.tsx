import type { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onAbout: () => void;
}

export default function Header({ theme, onToggleTheme, onAbout }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <svg className="header-ball" width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <circle cx="15" cy="15" r="13" stroke="var(--gold)" strokeWidth="1.8" />
          <circle cx="15" cy="15" r="4.5" stroke="var(--gold)" strokeWidth="1" opacity="0.45" />
          <line x1="15" y1="2"    x2="15" y2="10.5" stroke="var(--gold)" strokeWidth="0.7" opacity="0.3" />
          <line x1="15" y1="19.5" x2="15" y2="28"   stroke="var(--gold)" strokeWidth="0.7" opacity="0.3" />
          <line x1="2"    y1="15" x2="10.5" y2="15"  stroke="var(--gold)" strokeWidth="0.7" opacity="0.3" />
          <line x1="19.5" y1="15" x2="28"   y2="15"  stroke="var(--gold)" strokeWidth="0.7" opacity="0.3" />
        </svg>
        <h1 className="header-title">THE WORLD CUP</h1>
      </div>
      <div className="header-right">
        <span className="header-years">1930 — 2022</span>
        <button
          className="header-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'pitch' ? 'night' : 'pitch'} theme`}
        >
          {theme === 'pitch' ? 'Night' : 'Pitch'}
        </button>
        <button className="header-btn" onClick={onAbout} aria-label="About this site">
          About
        </button>
      </div>
    </header>
  );
}
