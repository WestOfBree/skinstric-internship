"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import Nav from "@/app/Components/Nav";
import { ProgressCircle } from "../Components/ProgressCircle";
import { clearSkinstricFlowData } from "@/app/utils/storage";

type SelectorType = "race" | "age" | "sex";

interface SelectorOption {
  id: string;
  label: string;
}

type SelectorScores = Record<SelectorType, Record<string, number>>;

interface NumericEntry {
  keyPath: string;
  score: number;
}

const PHASE_TWO_RESULT_STORAGE_KEY = "skinstric:phaseTwoResult";

const raceOptions: SelectorOption[] = [
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "southeast-asian", label: "Southeast Asian" },
  { id: "south-asian", label: "South Asian" },
  { id: "east-asian", label: "East Asian" },
  { id: "latino-hispanic", label: "Latino Hispanic" },
  { id: "middle-eastern", label: "Middle Eastern" },
];

const ageOptions: SelectorOption[] = [
  { id: "0-2", label: "0-2" },
  { id: "3-9", label: "3-9" },
  { id: "10-19", label: "10-19" },
  { id: "20-29", label: "20-29" },
  { id: "30-39", label: "30-39" },
  { id: "40-49", label: "40-49" },
  { id: "50-59", label: "50-59" },
  { id: "60-69", label: "60-69" },
  { id: "70+", label: "70+" },
];

const sexOptions: SelectorOption[] = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
];

const selectorOptionsMap: Record<SelectorType, SelectorOption[]> = {
  race: raceOptions,
  age: ageOptions,
  sex: sexOptions,
};

const selectorAliases: Record<SelectorType, string[]> = {
  race: ["race", "ethnicity"],
  age: ["age"],
  sex: ["sex", "gender"],
};

const optionAliases: Record<SelectorType, Record<string, string[]>> = {
  race: {
    asian: ["asian"],
    "east-asian": ["eastasian", "east-asian", "eastasian"],
    "south-asian": ["southasian", "south-asian", "southasian"],
    "southeast-asian": ["southeastasian", "southeast-asian", "southeastasian"],
    black: ["black", "africanamerican", "african"],
    "latino-hispanic": ["hispanic", "latino", "latina", "latinx"],
    "middle-eastern": ["middleeastern", "middleeast"],
    white: ["white", "caucasian"],
  },
  age: {
    "0-2": ["0to2", "0-2", "0_2"],
    "3-9": ["3to9", "3-9", "3_9"],
    "10-19": ["10to19", "10-19", "10_19"],
    "20-29": ["20to29", "20-29", "20_29"],
    "30-39": ["30to39", "30-39", "30_39"],
    "40-49": ["40to49", "40-49", "40_49"],
    "50-59": ["50to59", "50-59", "50_59"],
    "60-69": ["60to69", "60-69", "60_69"],
    "70+": ["70plus", "70over", "70+"],
  },
  sex: {
    male: ["male", "man", "m"],
    female: ["female", "woman", "f"],
  },
};

const normalizeKey = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const parseProbabilityToPercent = (rawValue: number): number => {
  if (!Number.isFinite(rawValue) || rawValue < 0) {
    return 0;
  }

  return rawValue <= 1 ? rawValue * 100 : rawValue;
};

const createEmptyScores = (): SelectorScores => ({
  race: Object.fromEntries(raceOptions.map((option) => [option.id, 0])),
  age: Object.fromEntries(ageOptions.map((option) => [option.id, 0])),
  sex: Object.fromEntries(sexOptions.map((option) => [option.id, 0])),
});

const collectNumericEntries = (
  value: unknown,
  path: string[] = [],
  entries: NumericEntry[] = [],
): NumericEntry[] => {
  if (typeof value === "number") {
    entries.push({
      keyPath: normalizeKey(path.join(".")),
      score: parseProbabilityToPercent(value),
    });
    return entries;
  }

  if (!value || typeof value !== "object") {
    return entries;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectNumericEntries(item, [...path, String(index)], entries);
    });
    return entries;
  }

  Object.entries(value).forEach(([key, nestedValue]) => {
    collectNumericEntries(nestedValue, [...path, key], entries);
  });

  return entries;
};

const getHighestOptionId = (
  type: SelectorType,
  scores: Record<string, number>,
): string | null => {
  return selectorOptionsMap[type].reduce<string | null>((highestId, option) => {
    if (!highestId) {
      return option.id;
    }

    return scores[option.id] > scores[highestId] ? option.id : highestId;
  }, null);
};

const mapApiResponseToSelectorScores = (
  responsePayload: unknown,
): SelectorScores => {
  const mappedScores = createEmptyScores();
  const entries = collectNumericEntries(responsePayload);

  (Object.keys(selectorOptionsMap) as SelectorType[]).forEach(
    (selectorType) => {
      selectorOptionsMap[selectorType].forEach((option) => {
        // Some UI option ids may not have explicit alias entries; fall back to the id.
        const aliases = (
          optionAliases[selectorType][option.id] ?? [option.id]
        ).map(normalizeKey);
        const selectorHints = selectorAliases[selectorType].map(normalizeKey);

        const matchingEntries = entries.filter((entry) =>
          aliases.some((alias) => entry.keyPath.includes(alias)),
        );

        const selectorScopedEntries = matchingEntries.filter((entry) =>
          selectorHints.some((selectorHint) =>
            entry.keyPath.includes(selectorHint),
          ),
        );

        const sourceEntries =
          selectorScopedEntries.length > 0
            ? selectorScopedEntries
            : matchingEntries;
        if (sourceEntries.length === 0) {
          return;
        }

        mappedScores[selectorType][option.id] = sourceEntries.reduce(
          (highestScore, entry) => Math.max(highestScore, entry.score),
          0,
        );
      });
    },
  );

  return mappedScores;
};

const SummaryPage = () => {
  const [selectedRace, setSelectedRace] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [activeSelector, setActiveSelector] = useState<SelectorType>("race");
  const [selectorScores] = useState<SelectorScores>(() => {
    if (typeof window === "undefined") {
      return createEmptyScores();
    }

    const rawStoredResponse = window.localStorage.getItem(
      PHASE_TWO_RESULT_STORAGE_KEY,
    );
    if (!rawStoredResponse) {
      return createEmptyScores();
    }

    try {
      const parsedResponse = JSON.parse(rawStoredResponse) as unknown;
      return mapApiResponseToSelectorScores(parsedResponse);
    } catch (error) {
      console.error("Unable to parse phase two result from storage", error);
      return createEmptyScores();
    }
  });

  const resolvedSelections = useMemo(() => {
    const fallbackRace = getHighestOptionId("race", selectorScores.race);
    const fallbackAge = getHighestOptionId("age", selectorScores.age);
    const fallbackSex = getHighestOptionId("sex", selectorScores.sex);

    return {
      race: selectedRace ?? fallbackRace,
      age: selectedAge ?? fallbackAge,
      sex: selectedSex ?? fallbackSex,
    };
  }, [selectedRace, selectedAge, selectedSex, selectorScores]);

  const progressPercentage = useMemo(() => {
    const selectedOptionId = resolvedSelections[activeSelector];
    if (!selectedOptionId) {
      return 0;
    }

    return Number(selectorScores[activeSelector][selectedOptionId].toFixed(2));
  }, [activeSelector, resolvedSelections, selectorScores]);

  const sortedActiveOptions = useMemo(() => {
    return [...selectorOptionsMap[activeSelector]].sort(
      (firstOption, secondOption) => {
        const firstScore = selectorScores[activeSelector][firstOption.id] ?? 0;
        const secondScore =
          selectorScores[activeSelector][secondOption.id] ?? 0;

        return secondScore - firstScore;
      },
    );
  }, [activeSelector, selectorScores]);

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
    return selectorOptionsMap[type];
  };

  const getSelectedOptionId = (type: SelectorType): string | null => {
    return resolvedSelections[type];
  };

  const getSelectedOptionLabel = (type: SelectorType): string => {
    const selectedId = getSelectedOptionId(type);
    if (!selectedId) {
      return "Placeholder";
    }

    const selectedOption = getOptionsForSelector(type).find(
      (option) => option.id === selectedId,
    );
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

  const formatPercent = (value: number): string => `${value.toFixed(2)}%`;

  return (
    <div className="h-screen md:h-[90vh] flex flex-col md:mt-5 bg-white text-black">
      <Nav />
      <div className="text-start ml-4 md:ml-12 mb-4 md:mb-10 uppercase">
        <h1 className="text-base md:text-base mb-1 leading-6 font-semibold text-[#1A1B1C]">
          A.I. Analysis
        </h1>
        <h3 className="text-4xl md:text-[64px] tracking-tighter font-normal text-[#1A1B1C]">
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
          <div className="bg-white-100 md:flex md:flex-col h-[62%] space-y-3 justify-between">
            <div
              onClick={() => setActiveSelector("race")}
              className={`p-3 cursor-pointer text-left text-sm font-semibold justify-between transition-colors flex-1 flex flex-col border-t ${
                activeSelector === "race"
                  ? "bg-[#1A1B1C] text-white"
                  : "bg-[#F3F3F4] hover:bg-[#E1E1E2] text-[#1A1B1C]"
              }`}
              aria-label="Select race section"
            >
              <p className="text-base">{getSelectedOptionLabel("race")}</p>
              <h4 className="text-base">RACE</h4>
            </div>

            <div
              onClick={() => setActiveSelector("age")}
              className={`p-3 cursor-pointer text-left text-sm font-semibold transition-colors justify-between flex-1 flex flex-col border-t ${
                activeSelector === "age"
                  ? "bg-[#1A1B1C] text-white"
                  : "bg-[#F3F3F4] hover:bg-[#E1E1E2] text-[#1A1B1C]"
              }`}
              aria-label="Select age section"
            >
              <p className="text-base">{getSelectedOptionLabel("age")}</p>
              <h4 className="text-base">AGE</h4>
            </div>

            <div
              onClick={() => setActiveSelector("sex")}
              className={`p-3 cursor-pointer text-left text-sm font-semibold transition-colors justify-between flex-1 flex flex-col border-t ${
                activeSelector === "sex"
                  ? "bg-[#1A1B1C] text-white"
                  : "bg-[#F3F3F4] hover:bg-[#E1E1E2] text-[#1A1B1C]"
              }`}
              aria-label="Select sex section"
            >
              <p className="text-base">{getSelectedOptionLabel("sex")}</p>
              <h4 className="text-base">SEX</h4>
            </div>
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
              {sortedActiveOptions.map((option) => (
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
                  <span className="flex items-center justify-between">
                    <div className="flex flex-row items-center">
                      <div className="border h-3 w-3 mr-2 rotate-45">
                        <div className={`bg-white mr-1 h-1.5 w-1.5 translate-x-0.5 translate-y-0.5 ${getSelectedOptionId(activeSelector) === option.id ? "visible" : "hidden"}`}></div>
                      </div>
                      <span>{option.label}</span>
                    </div>
                    <span>
                      {formatPercent(
                        selectorScores[activeSelector][option.id] ?? 0,
                      )}
                    </span>
                  </span>
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
            href="/"
            onClick={clearSkinstricFlowData}
            aria-label="Proceed"
            className="group inline-flex h-9 items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-semibold text-[#1A1B1C] transition-colors"
          >
            HOME
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
