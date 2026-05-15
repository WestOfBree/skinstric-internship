import { ReactNode } from "react";

interface RotatingDiamondStackProps {
  children?: ReactNode;
  className?: string;
}

const RotatingDiamondStack = ({ children, className = "" }: RotatingDiamondStackProps) => {
  return (
    <div className={`relative flex h-[min(580px,68vw)] w-[min(580px,68vw)] items-center justify-center ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 animate-[spin_40s_linear_infinite]"
      >
        <svg className="absolute inset-0 rotate-45" viewBox="0 0 100 100" aria-hidden="true" style={{ opacity: 0.3 }}>
          <rect
            x="1"
            y="1"
            width="96"
            height="96"
            fill="none"
            stroke="#A0A4AB"
            strokeOpacity="0.3"
            strokeWidth="0.45"
            strokeDasharray="0.1 1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[93.5%] w-[93.5%] -translate-x-1/2 -translate-y-1/2 animate-[spin_56s_linear_infinite]"
      >
        <svg className="absolute inset-0 rotate-45" viewBox="0 0 100 100" aria-hidden="true" style={{ opacity: 0.6 }}>
          <rect
            x="1"
            y="1"
            width="96"
            height="96"
            fill="none"
            stroke="#A0A4AB"
            strokeOpacity="0.6"
            strokeWidth="0.35"
            strokeDasharray="0.1 1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 animate-[spin_72s_linear_infinite] opacity-100"
      >
        <svg className="absolute inset-0 rotate-45" viewBox="0 0 100 100" aria-hidden="true" style={{ opacity: 1 }}>
          <rect
            x="1"
            y="1"
            width="96"
            height="96"
            fill="none"
            stroke="#A0A4AB"
            strokeOpacity="1"
            strokeWidth="0.3"
            strokeDasharray="0.1 1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {children}
    </div>
  );
};

export default RotatingDiamondStack;
