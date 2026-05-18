"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import Nav from "@/app/Components/Nav";

const Home = () => {
  const [activeCta, setActiveCta] = useState<"left" | "right" | null>(null);
  const diamondSize = 470;
  const diamondHalfDiagonal = diamondSize / Math.SQRT2;
  const buttonInsetFromLeftCorner = 80;
  const buttonInsetFromRightCorner = 80;

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />
      <div className="p-6 sm:p-0">
        <main className="relative flex min-h-[calc(100vh-88px)] items-center justify-center px-6 md:px-12">
          <div className="absolute bottom-6 left-6 hidden text-sm font-normal text-[#1A1B1C] lg:block md:bottom-16 md:left-12">
            <p className="whitespace-pre-line uppercase leading-5 font-weight-400">
              Skinstric developed an A.I. that creates a <br />
              highly-personalized routine tailored to <br />
              what your skin needs.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center lg:hidden"
          >
            <div className="absolute h-[min(60vw,320px)] w-[min(60vw,320px)] rotate-45 border border-dotted border-[#A0A4AB] opacity-70" />
            <div className="absolute h-[min(76vw,400px)] w-[min(76vw,400px)] rotate-45 border border-dotted border-[#A0A4AB] opacity-90" />
          </div>
          <div
            id="left-section"
            className={`fixed left-0 top-1/2 hidden h-0 w-0 origin-left scale-[0.38] translate-x-[-30%] transition-opacity duration-900 ease-in-out sm:scale-[0.48] sm:translate-x-[-24%] md:scale-[0.62] md:translate-x-[-18%] lg:block lg:scale-[0.76] lg:translate-x-[-12%] xl:scale-[0.88] xl:translate-x-[-6%] 2xl:scale-100 2xl:translate-x-0 ${
              activeCta === "right"
                ? "pointer-events-none opacity-0"
                : "opacity-100"
            }`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 border border-dotted border-[#A0A4AB]"
              style={{
                width: `${diamondSize}px`,
                height: `${diamondSize}px`,
                transform: "translate(-50%, -50%) rotate(45deg)",
              }}
            />
            <Link
              id="take-test-button-left"
              href="/testing"
              aria-label="Go left"
              onMouseEnter={() => setActiveCta("left")}
              onMouseLeave={() => setActiveCta(null)}
              onFocus={() => setActiveCta("left")}
              onBlur={() => setActiveCta(null)}
              className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 -translate-x-full -translate-y-1/2"
              style={{
                left: `calc(${diamondHalfDiagonal}px - ${buttonInsetFromRightCorner}px)`,
              }}
            >
              <div
                className={`relative mr-2 inline-block h-10.5 w-10.5 shrink-0 transition-transform duration-700 ease-in-out ${
                  activeCta === "left" ? "scale-125" : "scale-100"
                }`}
              >
                <Image
                  src={buttonIcon}
                  alt=""
                  fill
                  unoptimized
                  className="object-contain -scale-x-100"
                />
              </div>
              DISCOVER A.I.
            </Link>
          </div>

          <div
            id="main-heading"
            className="pointer-events-none relative z-10 hidden h-55 w-full lg:block"
          >
            <h1 className="relative text-[60px] h-55 lg:text-[100px] font-inter font-normal  leading-none tracking-lighter text-[#1A1B1C] opacity-100">
              <span
                className={`absolute top-0 block whitespace-nowrap transition-all duration-900 ease-in-out ${
                  activeCta === "right"
                    ? "left-25 translate-x-0"
                    : activeCta === "left"
                      ? "left-[calc(100%-100px)] -translate-x-full"
                      : "left-1/2 -translate-x-1/2"
                }`}
              >
                Sophisticated
              </span>
              <span
                className={`absolute top-25 block whitespace-nowrap transition-all duration-900 ease-in-out ${
                  activeCta === "right"
                    ? "left-25 translate-x-0"
                    : activeCta === "left"
                      ? "left-[calc(100%-100px)] -translate-x-full"
                      : "left-1/2 -translate-x-1/2"
                }`}
              >
                skincare
              </span>
            </h1>
          </div>

          <div className="relative z-10 flex w-full flex-col items-center text-center lg:hidden">
            <h1 className="text-[56px] font-inter font-normal leading-[0.95] tracking-lighter text-[#1A1B1C] sm:text-[72px] md:text-[60px]">
              <span className="block">Sophisticated</span>
              <span className="block">skincare</span>
            </h1>

            <p className="mt-3 text-xs font-semibold text-muted-foreground leading-5 text-[#1A1B1C83] sm:text-sm">
              Skinstric developed an A.I. that creates a <br />
              highly-personalized routine tailored to <br />
              what your skin needs.
            </p>

            <Link
              href="/testing"
              aria-label="Enter experience"
              className="group mt-4 inline-flex h-9 items-center justify-center gap-3 whitespace-nowrap rounded-md text-xs font-semibold text-[#1A1B1C] transition-colors"
            >
              ENTER EXPERIENCE
              <div className="relative inline-block h-8.5 w-8.5 shrink-0 transition-transform duration-700 ease-in-out group-hover:scale-125">
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

          <div
            id="right-section"
            className={`fixed right-0 top-1/2 hidden h-0 w-0 origin-right scale-[0.38] translate-x-[30%] transition-opacity duration-900 ease-in-out sm:scale-[0.48] sm:translate-x-[24%] md:scale-[0.62] md:translate-x-[18%] lg:block lg:scale-[0.76] lg:translate-x-[12%] xl:scale-[0.88] xl:translate-x-[6%] 2xl:scale-100 2xl:translate-x-0 ${
              activeCta === "left"
                ? "pointer-events-none opacity-0"
                : "opacity-100"
            }`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 border border-dotted border-[#A0A4AB]"
              style={{
                width: `${diamondSize}px`,
                height: `${diamondSize}px`,
                transform: "translate(-50%, -50%) rotate(45deg)",
              }}
            />
            <Link
              id="take-test-button"
              href="/testing"
              aria-label="Go right"
              onMouseEnter={() => setActiveCta("right")}
              onMouseLeave={() => setActiveCta(null)}
              onFocus={() => setActiveCta("right")}
              onBlur={() => setActiveCta(null)}
              className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer disabled:opacity-50 h-9 absolute top-1/2 -translate-y-1/2"
              style={{
                left: `calc(-${diamondHalfDiagonal}px + ${buttonInsetFromLeftCorner}px)`,
              }}
            >
              TAKE TEST
              <div className="relative ml-2 inline-block h-10.5 w-10.5 shrink-0">
                <Image
                  src={buttonIcon}
                  alt=""
                  fill
                  unoptimized
                  className={`object-contain transition-transform duration-700 ease-in-out ${
                    activeCta === "right" ? "scale-125" : "scale-100"
                  }`}
                />
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
