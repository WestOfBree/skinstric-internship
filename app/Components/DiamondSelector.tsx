import type { DiamondOption } from "@/app/Components/NonRotatingDiamondStack";

type DiamondSelectorProps = {
  activeOption: DiamondOption | null;
  onOptionHover: (option: DiamondOption | null) => void;
  onDemographicsClick?: () => void;
};

const DiamondSelector = ({
  activeOption,
  onOptionHover,
  onDemographicsClick,
}: DiamondSelectorProps) => (
  <div
    className="relative flex h-[min(325px,31vw)] w-[min(325px,31vw)] items-center justify-center rotate-45 text-[#1A1B1C] tracking-tight uppercase  font-semibold leading-6"
    style={{ fontFamily: '"Roobert", var(--font-geist-sans), sans-serif' }}
  >
    {/* Grid container - 2x2 with gaps */}
    <div className="relative z-10 grid h-full w-full grid-cols-2 gap-1 p-1">
      {/* Skin Type - Top Left */}
      <div
        className="relative cursor-pointer transition-all duration-300"
        style={{
          backgroundColor: activeOption === "skinType" ? "#C2C4C9" : "#E1E1E2",
        }}
        onClick={onDemographicsClick}
        onMouseEnter={() => onOptionHover("skinType")}
        onMouseLeave={() => onOptionHover(null)}
        role={onDemographicsClick ? "button" : undefined}
        tabIndex={onDemographicsClick ? 0 : undefined}
        onKeyDown={
          onDemographicsClick
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onDemographicsClick();
                }
              }
            : undefined
        }
      >
        {/* Label - counter-rotate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none">
          <span className="whitespace-nowrap text-[#1A1B1C]">Demographics</span>
        </div>
      </div>

      {/* Concerns - Top Right */}
      <div
        className="relative cursor-not-allowed transition-all duration-300"
        style={{
          backgroundColor: activeOption === "concerns" ? "#C2C4C9" : "#E1E1E2",
        }}
        onMouseEnter={() => onOptionHover("concerns")}
        onMouseLeave={() => onOptionHover(null)}
      >
        {/* Label - counter-rotate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none">
          <span className=" whitespace-nowrap text-[#1A1B1C]" >
            Skin Type Details
          </span>
        </div>
      </div>

      {/* Lifestyle - Bottom Left */}
      <div
        className="relative cursor-not-allowed transition-all duration-300"
        style={{
          backgroundColor: activeOption === "lifestyle" ? "#C2C4C9" : "#E1E1E2",
        }}
        onMouseEnter={() => onOptionHover("lifestyle")}
        onMouseLeave={() => onOptionHover(null)}
      >
        {/* Label - counter-rotate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none text-center leading-tight">
          <span className="">
            Cosmetic <br /> Concerns
          </span>
        </div>
      </div>

      {/* Preferences - Bottom Right */}
      <div
        className="relative cursor-not-allowed transition-all duration-300"
        style={{
          backgroundColor: activeOption === "preferences" ? "#C2C4C9" : "#E1E1E2",
        }}
        onMouseEnter={() => onOptionHover("preferences")}
        onMouseLeave={() => onOptionHover(null)}
      >
        {/* Label - counter-rotate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none">
          <span className="whitespace-nowrap">
            Weather
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default DiamondSelector;
