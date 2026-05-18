interface CaptureGuidelinesProps {
  className?: string;
}

const guidelineItems: string[] = [
  "neutral expression",
  "frontal pose",
  "adequate lighting",
];

const CaptureGuidelines = ({ className = "" }: CaptureGuidelinesProps) => {
  return (
    <div className={`space-y-1 text-center pt-30 ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1A1B1C]/60">
        To get better results make sure to have
      </p>
      <div className="mt-4 flex uppercase">
        {guidelineItems.map((item) => (
          <div key={item} className="mr-8 flex items-center justify-center last:mr-0">
            <div className="mr-1 h-2 w-2 rotate-45 border" />
            <p className="text-sm font-medium text-[#1A1B1C]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaptureGuidelines;