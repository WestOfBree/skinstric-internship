"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import captureIcon from "@/public/capture-icon.svg";
import Nav from "@/app/Components/Nav";
import CaptureGuidelines from "@/app/Components/CaptureGuidelines";
import { setStoredUploadedImage } from "@/app/utils/storage";

const CameraCapturePage = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        console.error("Unable to start camera:", error);
        if (isMounted) {
          setCameraError("Camera access is unavailable. Please try again.");
        }
      }
    };

    void startCamera();

    return () => {
      isMounted = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;

    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      setCameraError("Camera is still loading. Please wait a moment and try again.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError("Unable to capture the image right now.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const capturedImage = canvas.toDataURL("image/jpeg", 0.95);

    setStoredUploadedImage(capturedImage);
    router.push("/results");
  };

  return (
    <div className="h-screen overflow-y-clip bg-white text-black">
      <Nav />
      <main className="relative h-[calc(100vh-88px)] overflow-hidden">
        <h1 className="absolute left-4 top-0 text-[12px] font-semibold uppercase text-[#1A1B1C] md:left-10">
          Camera Capture
        </h1>

        {cameraError && (
          <p className="absolute left-4 top-6 max-w-xs text-xs font-semibold uppercase tracking-[0.12em] text-[#B42318] md:left-10">
            {cameraError}
          </p>
        )}

        <section className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center px-0">
          <div className="relative h-[calc(100vh-88px)] w-full overflow-hidden border border-[#1A1B1C]/15 bg-[#F5F5F5] shadow-[0_24px_80px_rgba(26,27,28,0.08)]">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(26,27,28,0.08))]" />

          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:right-2 flex items-center justify-center gap-4">
		  <p className="text-white">Take Picture</p>
            <button
              type="button"
              onClick={handleCapture}
              aria-label="Capture image and return to results"
              className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#1A1B1C]/15 bg-white text-sm font-semibold text-[#1A1B1C] shadow-[0_18px_40px_rgba(26,27,28,0.12)] transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-7 w-7">
				
                <Image
                  src={captureIcon}
                  alt=""
                  fill
                  unoptimized
                  className="object-contain p-1"
                />
              </div>
            </button>
          </div>
        </section>
		

        <div className="absolute bottom-6 left-6 md:bottom-3 md:left-12">
			
          <Link
            href="/results"
            aria-label="Go back"
            className="group inline-flex h-9 items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-semibold text-white transition-colors"
          >
            <div className="relative ml-4 inline-block h-13.5 w-13.5 shrink-0">
              <Image
                src={buttonIcon}
                alt=""
                fill
                unoptimized
                className="object-contain -scale-x-100 invert"
              />
            </div>
            BACK
          </Link>
		  
        </div>
		<CaptureGuidelines className="absolute bottom-6 left-1/2 -translate-x-1/2 invert md:bottom-12" />
		
      </main>
    </div>
  );
};

export default CameraCapturePage;
