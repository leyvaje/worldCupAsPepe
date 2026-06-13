import { useEffect, useRef } from 'react';

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="About this site"
    >
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-ball-deco" aria-hidden="true">
          <svg viewBox="0 0 40 40" width="40" height="40">
            <defs>
              <radialGradient id="about-ball-grad" cx="36%" cy="30%" r="65%">
                <stop offset="0%"   stopColor="#ffe88e" />
                <stop offset="40%"  stopColor="#c9a84c" />
                <stop offset="100%" stopColor="#6e4e10" />
              </radialGradient>
            </defs>
            <circle cx="20" cy="20" r="17" fill="url(#about-ball-grad)" stroke="#4a3008" strokeWidth="1" />
            <g fill="rgba(0,0,0,0.28)">
              <polygon points="20,6 25.3,10 23.3,16.3 16.7,16.3 14.7,10" />
              <polygon points="8,25.5 12.8,21.8 18.5,25 17,32 10.3,32.5" />
              <polygon points="32,25.5 27.2,21.8 21.5,25 23,32 29.7,32.5" />
            </g>
            <ellipse cx="14.5" cy="13" rx="4" ry="2.8" fill="rgba(255,255,255,0.55)" transform="rotate(-22 14.5 13)" />
          </svg>
        </div>
        <div className="modal-title">ABOUT</div>
        <p className="modal-body">
          This history of the world cup website was created by <strong>Ann-Sophie</strong> and <strong>Pepe</strong> having fun
          using Claude Design and Claude Code.
          <br /><br />
          We hope you like it.
          <br /><br />
          With love from the Sauerland, Germany. 🖤❤️💛
        </p>
      </div>
    </div>
  );
}
