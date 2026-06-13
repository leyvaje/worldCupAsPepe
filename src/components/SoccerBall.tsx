interface SoccerBallProps {
  variant?: 'classic' | 'gold';
  width?: number;
  height?: number;
  className?: string;
}

export default function SoccerBall({ variant = 'classic', width = 22, height = 22, className }: SoccerBallProps) {
  const isGold = variant === 'gold';
  const gradId = isGold ? 'ball-grad-gold' : 'ball-grad-classic';
  const clipId = isGold ? 'ball-clip-gold' : 'ball-clip-classic';

  return (
    <svg className={className} viewBox="0 0 24 24" width={width} height={height}>
      <defs>
        <radialGradient id={gradId} cx="36%" cy="30%" r="65%">
          {isGold ? (
            <>
              <stop offset="0%"   stopColor="#ffe88e" />
              <stop offset="40%"  stopColor="#c9a84c" />
              <stop offset="100%" stopColor="#6e4e10" />
            </>
          ) : (
            <>
              <stop offset="0%"   stopColor="#ffffff" />
              <stop offset="40%"  stopColor="#f2eeea" />
              <stop offset="100%" stopColor="#a8a49e" />
            </>
          )}
        </radialGradient>
        <clipPath id={clipId}>
          <circle cx="12" cy="12" r="10.2" />
        </clipPath>
      </defs>

      <circle
        cx="12" cy="12" r="10.2"
        fill={`url(#${gradId})`}
        stroke={isGold ? '#4a3008' : '#1c1c1c'}
        strokeWidth="0.9"
      />

      <g clipPath={`url(#${clipId})`} fill={isGold ? 'rgba(0,0,0,0.3)' : '#151515'}>
        <polygon points="12,3.0 15.2,5.4 14.0,9.0 10.0,9.0 8.8,5.4" />
        <polygon points="4.8,15.8 7.7,13.4 11.1,15.3 10.0,19.5 5.8,19.8" />
        <polygon points="19.2,15.8 16.3,13.4 12.9,15.3 14.0,19.5 18.2,19.8" />
        <polygon points="-0.8,8.5 2.8,7.7 5.2,11.2 3.2,15.0 -0.5,14.2" />
        <polygon points="24.8,8.5 21.2,7.7 18.8,11.2 20.8,15.0 24.5,14.2" />
      </g>

      <g
        clipPath={`url(#${clipId})`}
        stroke={isGold ? 'rgba(0,0,0,0.2)' : '#888'}
        strokeWidth="0.5"
        fill="none"
        opacity={isGold ? 0.8 : 0.55}
      >
        <line x1="12"  y1="1.5"  x2="12"  y2="3.0" />
        <line x1="15.2" y1="5.4" x2="19.8" y2="3.6" />
        <line x1="8.8" y1="5.4"  x2="4.2"  y2="3.6" />
        <line x1="14.0" y1="9.0" x2="16.3" y2="13.4" />
        <line x1="10.0" y1="9.0" x2="7.7"  y2="13.4" />
        <line x1="10.0" y1="19.5" x2="14.0" y2="19.5" />
        <line x1="2.8"  y1="7.7"  x2="8.8"  y2="5.4" />
        <line x1="21.2" y1="7.7"  x2="15.2" y2="5.4" />
        <line x1="3.2"  y1="15.0" x2="7.7"  y2="13.4" />
        <line x1="20.8" y1="15.0" x2="16.3" y2="13.4" />
        <line x1="5.8"  y1="19.8" x2="4.8"  y2="15.8" />
        <line x1="18.2" y1="19.8" x2="19.2" y2="15.8" />
      </g>

      <ellipse
        cx="8.6" cy="7.4" rx="2.5" ry="1.7"
        fill={isGold ? 'rgba(255,255,255,0.65)' : 'white'}
        opacity={isGold ? 1 : 0.45}
        transform="rotate(-22 8.6 7.4)"
      />
    </svg>
  );
}
