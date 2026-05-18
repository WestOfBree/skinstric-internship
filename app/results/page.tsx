"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import Nav from "@/app/Components/Nav";
import cameraIcon from "@/public/camera-icon.svg";
import galleryIcon from "@/public/gallery-icon.svg";
import galleryTitle from "@/public/gallery-title.svg";
import cameraTitle from "@/public/camera-title.svg";
import DiamondStack from "@/app/Components/DiamondStack";
import axios from "axios";
import Popup from "@/app/Components/Popup";
import { getStoredUploadedImage, setStoredUploadedImage } from "@/app/utils/storage";

const PHASE_TWO_RESULT_STORAGE_KEY = "skinstric:phaseTwoResult";

const ResultsPage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(() => getStoredUploadedImage());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isPhaseTwoSubmitting, setIsPhaseTwoSubmitting] = useState(false);
  const [hasTriedProceedWithoutImage, setHasTriedProceedWithoutImage] = useState(false);
  const [phaseTwoError, setPhaseTwoError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCameraAllow = () => {
    setIsOpen(false);
    router.push("/Camera");
  };

  const handleCameraDeny = () => {
    setIsOpen(false);
  };

  const submitPhaseTwo = async (name: string, city: string, image: string) => {
    const response = await axios.post(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
      {
        name,
        location: city,
        image,
      }
    );

    return response.data;
  };

  // Handle file selection and convert to base64
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setHasTriedProceedWithoutImage(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setUploadedImage(base64String);
      setStoredUploadedImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  // Trigger file input on click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleProceed = async () => {
    if (isPhaseTwoSubmitting) {
      return;
    }

    if (!uploadedImage) {
      setHasTriedProceedWithoutImage(true);
      return;
    }

    const NAME_STORAGE_KEY = "skinstric:userName";
    const CITY_STORAGE_KEY = "skinstric:userCity";
    const userName = window.localStorage.getItem(NAME_STORAGE_KEY);
    const userCity = window.localStorage.getItem(CITY_STORAGE_KEY);

    if (!userName || !userCity) {
      console.warn("User name or city not set");
      setPhaseTwoError("Missing profile details. Please return and enter your name and city.");
      return;
    }

    setPhaseTwoError("");
    setIsPhaseTwoSubmitting(true);

    try {
      const phaseTwoData = await submitPhaseTwo(userName, userCity, uploadedImage);
      window.localStorage.setItem(PHASE_TWO_RESULT_STORAGE_KEY, JSON.stringify(phaseTwoData));
      router.push("/summary");
    } catch (error) {
      const apiErrorMessage =
        axios.isAxiosError(error) && typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : "Unable to load your analysis data right now. Please try again.";

      setPhaseTwoError(apiErrorMessage);
      console.error("Error posting data:", error);
    } finally {
      setIsPhaseTwoSubmitting(false);
    }
  };

  return (
    <div className="h-screen overflow-y-clip bg-white text-black">
      <Nav />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload image file"
      />

      <main className="relative flex h-[calc(100vh-88px)] items-center justify-around px-6 md:px-12">
        <h1 className="absolute left-4 top-0 text-[12px] font-semibold uppercase text-[#1A1B1C] md:left-10">
          A.I. Analysis
        </h1>
        {isPhaseTwoSubmitting && (
          <p className="absolute left-4 top-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#1A1B1C] md:left-10">
            Syncing profile...
          </p>
        )}
        {phaseTwoError && (
          <p className="absolute left-4 top-6 max-w-xs text-xs font-semibold uppercase tracking-[0.12em] text-[#B42318] md:left-10">
            {phaseTwoError}
          </p>
        )}
        {hasTriedProceedWithoutImage && (
          <p className="absolute right-6 bottom-14 max-w-xs text-right text-xs font-semibold uppercase tracking-[0.12em] text-[#B42318] md:right-12">
            Image is required.
          </p>
        )}

        {/* Preview box — top-right under nav */}
        <div
          aria-label="Preview"
          className="absolute right-6 top-0 z-30 w-32 h-38 border border-[#1A1B1C]/20 bg-[#F5F5F5] md:right-12 flex items-center justify-center overflow-hidden"
        >
          {uploadedImage && (
            <Image
              src={uploadedImage}
              alt="Uploaded preview"
              fill
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Back button */}
        <div className="absolute bottom-6 left-6 md:bottom-3 md:left-12">
          <Link
            href="/testing"
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
        </div>

        {/* Proceed button */}
        <div className="absolute bottom-6 right-6 z-30 transition-all duration-900 ease-in-out md:bottom-3 md:right-12">
          <button
            type="button"
            aria-label="Proceed"
            onClick={() => {
              void handleProceed();
            }}
            className=" cursor-pointer group inline-flex h-9 items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-semibold text-[#1A1B1C] transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPhaseTwoSubmitting}
          >
            {isPhaseTwoSubmitting ? "SYNCING..." : "PROCEED"}
            <div className="relative ml-2 inline-block h-13.5 w-13.5 shrink-0 transition-transform duration-700 ease-in-out group-hover:scale-125">
              <Image
                src={buttonIcon}
                alt=""
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </button>
        </div>

        {/* Two diamond stacks */}
        <section className="relative z-10 flex w-full -translate-y-12.5 flex-col items-center justify-center gap-8 md:flex-row md:justify-around md:gap-0">
          <div className="relative flex-none cursor-pointer" onClick={() => setIsOpen(true)}>
            <DiamondStack icon={cameraIcon} />
            <Image
              src={cameraTitle}
              alt="Allow A.I. to scan your face"
              className="absolute left-[66%] top-[25%] w-[min(210px,19vw)] max-w-none "
              
            />
            <Popup
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onAllow={handleCameraAllow}
              onDeny={handleCameraDeny}
            />
          </div>

          <div className="relative flex-none cursor-pointer" onClick={handleUploadClick}>
            <DiamondStack icon={galleryIcon} />
            <Image
              src={galleryTitle}
              alt="Allow A.I. access gallery"
              className="pointer-events-none absolute right-[64%] top-[58%] w-[min(180px,16vw)] max-w-none"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResultsPage;
