"use client";

import DiamondStack from "@/app/Components/DiamondStack";
import CaptureGuidelines from "@/app/Components/CaptureGuidelines";
import cameraIcon from "@/public/camera-icon.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CameraLoadingPage = () => {
  const router = useRouter();
  const [cameraStatus, setCameraStatus] = useState<"requesting" | "denied">(
    "requesting",
  );

  useEffect(() => {
    let isMounted = true;

    const requestCameraAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());

        if (isMounted) {
          router.replace("/Camera/Capture");
        }
      } catch (error) {
        console.error("Camera access denied or unavailable:", error);
        if (isMounted) {
          setCameraStatus("denied");
        }
      }
    };

    void requestCameraAccess();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="h-screen overflow-y-clip bg-white text-black">
      <main className="relative flex h-[calc(100vh)] items-center justify-center px-6 md:px-12">
        <section className="flex flex-col items-center justify-center gap-1 text-center">
          <DiamondStack icon={cameraIcon} />

          <div className="-mt-30 text-center">
            <h4 className="text-base font-medium text-[#1A1B1C]">
              {cameraStatus === "requesting"
                ? "Setting up camera..."
                : "Camera access denied"}
            </h4>
          </div>

          <CaptureGuidelines />
        </section>
      </main>
    </div>
  );
};

export default CameraLoadingPage;
