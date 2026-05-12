type DiamondOption = "skinType" | "concerns" | "preferences" | "lifestyle";

type NonRotatingDiamondStackProps = {
  activeOption: DiamondOption | null;
};

const NonRotatingDiamondStack = ({
  activeOption,
}: NonRotatingDiamondStackProps) => (
  <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(525px,53vw)] w-[min(525px,53vw)] -translate-x-1/2 -translate-y-1/2">
    <div
      className="absolute left-1/2 top-1/2 transition-all duration-300"
      style={{
        width: "100%",
        height: "100%",
        opacity: activeOption === "skinType" ? 0.9 : 0,
        transform: `translate(-50%, -50%) rotate(45deg) scale(${activeOption === "skinType" ? 1 : 0.72})`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="96"
          height="96"
          fill="none"
          stroke="#A0A4AB"
          strokeOpacity="1"
          strokeWidth="0.45"
          strokeDasharray="0.1 1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>

    <div
      className="absolute left-1/2 top-1/2 transition-all duration-300"
      style={{
        width: "89%",
        height: "89%",
        opacity: activeOption === "concerns" ? 0.92 : 0,
        transform: `translate(-50%, -50%) rotate(45deg) scale(${activeOption === "concerns" ? 1 : 0.72})`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="96"
          height="96"
          fill="none"
          stroke="#A0A4AB"
          strokeOpacity="1"
          strokeWidth="0.4"
          strokeDasharray="0.1 1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>

    <div
      className="absolute left-1/2 top-1/2 transition-all duration-300"
      style={{
        width: "78%",
        height: "78%",
        opacity: activeOption === "lifestyle" ? 0.95 : 0,
        transform: `translate(-50%, -50%) rotate(45deg) scale(${activeOption === "lifestyle" ? 1 : 0.72})`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="96"
          height="96"
          fill="none"
          stroke="#A0A4AB"
          strokeOpacity="1"
          strokeWidth="0.35"
          strokeDasharray="0.1 1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>

    <div
      className="absolute left-1/2 top-1/2 transition-all duration-300"
      style={{
        width: "73%",
        height: "73%",
        opacity: activeOption === "preferences" ? 1 : 0,
        transform: `translate(-50%, -50%) rotate(45deg) scale(${activeOption === "preferences" ? 1 : 0.72})`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
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
  </div>
);

export type { DiamondOption };
export default NonRotatingDiamondStack;
