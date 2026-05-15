"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Nav from "@/app/Components/Nav";
import DiamondSelector from "@/app/Components/DiamondSelector";
import NonRotatingDiamondStack, {
  type DiamondOption,
} from "@/app/Components/NonRotatingDiamondStack";
import buttonIcon from "@/public/button-icon-shrunk.svg";

const SelectPage = () => {
  const [activeOption, setActiveOption] = useState<DiamondOption | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />
      <main className="relative flex min-h-[calc(100vh-88px)] items-center justify-center px-6 md:px-12">
        {/* Back button */}
        <h1 className="absolute left-4 top-0 text-[16px] font-semibold uppercase text-[#1A1B1C] md:left-10">
          A.I. Analysis
        </h1>
        <h2 className="absolute left-4 top-6 text-[14px] font-normal uppercase text-[#1A1B1C] md:left-10">
          A. I. has estimated the following. <br />
          Fix estimated information if needed.
        </h2>
        <div className="absolute bottom-6 left-6 md:bottom-3 md:left-12">
          <Link
            href="/results"
            aria-label="Go back"
            className="group inline-flex h-9 items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-semibold text-[#1A1B1C] transition-colors"
          >
            <div className="relative mr-2 inline-block h-13.5 w-13.5 shrink-0 transition-transform duration-700 ease-in-out group-hover:scale-125">
              <Image
                src={buttonIcon}
                alt=""
                fill
                unoptimized
                className="object-contain -scale-x-100"
              />
            </div>
            BACK
          </Link>
        </div>

        {/* Main content */}
        <div className="relative flex flex-col items-center gap-8">
          <div className="relative flex h-[min(525px,53vw)] w-[min(525px,53vw)] items-center justify-center">
            <NonRotatingDiamondStack activeOption={activeOption} />
            <DiamondSelector
              activeOption={activeOption}
              onOptionHover={setActiveOption}
              onDemographicsClick={() => {
                router.push("/summary");
              }}
            />
          </div>
        </div>

        {/* Proceed button */}
        <div className="absolute bottom-6 right-6 z-30 md:bottom-3 md:right-12">
          <Link
            href="/summary"
            aria-label="Get Summary"
            className="group uppercase inline-flex h-9 items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-semibold text-[#1A1B1C] transition-colors"
          >
            Get Summary
            <div className="relative ml-2 inline-block h-13.5 w-13.5 shrink-0 transition-transform duration-700 ease-in-out group-hover:scale-125">
              <Image
                src={buttonIcon}
                alt=""
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SelectPage;
