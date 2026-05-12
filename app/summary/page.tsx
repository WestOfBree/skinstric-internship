"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import Nav from "@/app/Components/Nav";
import { ProgressCircle } from "../Components/ProgressCircle";

type SelectorType = "race" | "age" | "sex";

interface SelectorOption {
  id: string;
  label: string;
}

const raceOptions: SelectorOption[] = [
  { id: "asian", label: "Asian" },
  { id: "black", label: "Black" },
  { id: "hispanic", label: "Hispanic" },
  { id: "middle-eastern", label: "Middle Eastern" },
  { id: "white", label: "White" },
];

const ageOptions: SelectorOption[] = [
  { id: "18-25", label: "18-25" },
  { id: "26-35", label: "26-35" },
  { id: "36-45", label: "36-45" },
  { id: "46-55", label: "46-55" },
  { id: "56-65", label: "56-65" },
  { id: "65+", label: "65+" },
];

const sexOptions: SelectorOption[] = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "non-binary", label: "Non-binary" },
];

const SummaryPage = () => {
  const [selectedRace, setSelectedRace] = useState<string | null>("black");
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [activeSelector, setActiveSelector] = useState<SelectorType>("race");

  // Calculate total selections for progress
  const totalSelections = [selectedRace, selectedAge, selectedSex].filter(Boolean).length;
  const maxSelections = 3;
  const progressPercentage = Math.round(
    (totalSelections / maxSelections) * 100,
  );

  const setActiveOption = (type: SelectorType, id: string) => {
    if (type === "race") {
      setSelectedRace(id);
    } else if (type === "age") {
      setSelectedAge(id);
    } else if (type === "sex") {
      setSelectedSex(id);
    }
  };

  const getOptionsForSelector = (type: SelectorType): SelectorOption[] => {
    if (type === "race") {
      return raceOptions;
    }

    if (type === "age") {
      return ageOptions;
    }

    return sexOptions;
  };

  const getSelectedOptionId = (type: SelectorType): string | null => {
    if (type === "race") {
      return selectedRace;
    }

    if (type === "age") {
      return selectedAge;
    }

    return selectedSex;
  };

  const getSelectedOptionLabel = (type: SelectorType): string => {
    const selectedId = getSelectedOptionId(type);
    if (!selectedId) {
      return "Placeholder";
    }

    const selectedOption = getOptionsForSelector(type).find((option) => option.id === selectedId);
    return selectedOption?.label ?? "Placeholder";
  };

  const getSelectorLabel = (type: SelectorType): string => {
    const labelMap: Record<SelectorType, string> = {
      race: "Race",
      age: "Age",
      sex: "Sex",
    };
    return labelMap[type];
  };

  return (
    <div className="h-screen md:h-[90vh] flex flex-col md:mt-5 bg-white text-black">
      <Nav />
      <div className="text-start ml-4 md:ml-12 mb-4 md:mb-10 uppercase">
        <h1 className="text-base md:text-base mb-1 leading-6 font-semibold text-[#1A1B1C]">
          A.I. Analysis
        </h1>
        <h3 className="text-4xl md:text-[72px] tracking-tighter font-normal text-[#1A1B1C]">
          Demographics
        </h3>
        <h2 className="text-[14px] font-normal text-[#1A1B1C] leading-6">
          predicted race & age
        </h2>
      </div>
      <main className="relative flex-1 w-full overflow-auto md:overflow-visible">
        {/* grid class */}
        <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] mx-5 px-4 gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
          {/* Left Section - Selector Buttons */}
          <div className="bg-white-100 spacey-3 md:flex md:flex-col h-[62%]">
            <button
              onClick={() => setActiveSelector("race")}
              className={`p-3 cursor-pointer text-left text-sm font-semibold justify-between transition-colors ${
                activeSelector === "race"
                  ? "bg-[#1A1B1C] text-white"
                  : "bg-[#F3F3F4] hover:bg-[#E1E1E2] text-[#1A1B1C]"
              }`}
              aria-label="Select race section"
            >
              <p className="text-base">Black</p>
              <h4 className="text-base">RACE</h4>
            </button>

            <button
              onClick={() => setActiveSelector("age")}
              className={`p-3 cursor-pointer text-left text-sm font-semibold transition-colors ${
                activeSelector === "age"
                  ? "bg-[#1A1B1C] text-white"
                  : "bg-[#F3F3F4] hover:bg-[#E1E1E2] text-[#1A1B1C]"
              }`}
              aria-label="Select age section"
            >
              AGE
            </button>

            <button
              onClick={() => setActiveSelector("sex")}
              className={`p-3 cursor-pointer text-left text-sm font-semibold transition-colors ${
                activeSelector === "sex"
                  ? "bg-[#1A1B1C] text-white"
                  : "bg-[#F3F3F4] hover:bg-[#E1E1E2] text-[#1A1B1C]"
              }`}
              aria-label="Select sex section"
            >
              SEX
            </button>
          </div>

          {/* Middle Section - Main Content */}
          <div className="relative bg-gray-100 p-4 flex flex-col items-end justify-center md:h-[57vh] md:border-t">
            {/* Header with Selector Title */}
            <div className="w-full text-start">
              <p className="text-[40px] font-normal text-[#1A1B1C] mb-4">
                {getSelectedOptionLabel(activeSelector)}
              </p>
            </div>
            <div className="w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
              <ProgressCircle progressPercentage={progressPercentage} />
            </div>
          </div>

            {/* Right Section - Bulleted List  */}
          <div className="bg-gray-100 pt-4 pb-4 md:border-t">
            <div className="space-y-0">
                <div className="uppercase flex justify-between px-4 text-base leading-6 tracking-tight font-medium mb-2">
              <h4>{getSelectorLabel(activeSelector)}</h4>
              <h4>A.I Confidence</h4>
                </div>
            {getOptionsForSelector(activeSelector).map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveOption(activeSelector, option.id)}
                className={`w-full p-3 cursor-pointer text-left text-sm font-semibold transition-colors ${
                  getSelectedOptionId(activeSelector) === option.id
                    ? "bg-[#1A1B1C] text-white"
                    : "bg-[#F3F3F4] hover:bg-[#E1E1E2] text-[#1A1B1C]"
                }`}
                aria-label={`Select ${option.label}`}
              >
                {option.label}
              </button>
            ))}
            </div>
          </div>
        </div>

        <div className="mx-5 mb-3 mt-2 grid grid-cols-[auto_1fr_auto] items-center px-4 md:mt-4">
          <Link
            href="/select"
            aria-label="Go back"
            className="group inline-flex h-9 items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-semibold text-[#1A1B1C] transition-colors"
          >
            <div className="relative mr-2 inline-block h-13.5 w-13.5 shrink-0">
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

          <p className="pointer-events-none text-center text-xs font-normal leading-6 text-[#A0A4AB] md:text-sm lg:text-base">
            If A.I. estimate is wrong, select the correct one.
          </p>

          <Link
            href="/results"
            aria-label="Proceed"
            className="group inline-flex h-9 items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-semibold text-[#1A1B1C] transition-colors"
          >
            PROCEED
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

export default SummaryPage;
