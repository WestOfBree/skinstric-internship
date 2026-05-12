 export const ProgressCircle = ({ progressPercentage }: { progressPercentage: number }) => (
            <div className="relative w-full h-full flex items-center justify-center">
              <svg
                className="absolute w-full h-full transform -rotate-90"
                viewBox="0 0 200 200"
              >
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#D0D0D0"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#1A1B1C"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 90}`}
                  strokeDashoffset={`${2 * Math.PI * 90 * (1 - progressPercentage / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              {/* Percentage Text */}
              <div className="absolute text-center flex">
                <span className="text-4xl md:text-5xl font-bold text-[#1A1B1C]">
                  {progressPercentage}
                </span>
                <span className="text-3xl text-[#1A1B1C] block">%</span>
              </div>
            </div> 
            );