interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeMap = {
    sm: { width: 24, height: 21 },
    md: { width: 48, height: 42 },
    lg: { width: 96, height: 84 },
  };

  const { width, height } = sizeMap[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shared vertical stem */}
      <rect x="40" y="4" width="16" height="76" fill="currentColor" />
      {/* F: top arm */}
      <rect x="4" y="4" width="52" height="14" fill="currentColor" />
      {/* F: mid arm (accent) */}
      <rect x="4" y="34" width="36" height="12" fill="currentColor" opacity="0.6" />
      {/* F: left stem */}
      <rect x="4" y="4" width="14" height="76" fill="currentColor" />
      {/* T: right arm */}
      <rect x="40" y="4" width="52" height="14" fill="currentColor" />
      {/* Intersection highlight */}
      <rect x="40" y="4" width="16" height="14" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
