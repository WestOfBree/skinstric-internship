import Image from "next/image";
import Link from "next/link";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import Nav from "@/app/Components/Nav";
import cameraIcon from "@/public/camera-icon.svg";
import galleryIcon from "@/public/gallery-icon.svg";
import galleryTitle from "@/public/gallery-title.svg";
import cameraTitle from "@/public/camera-title.svg";
import DiamondStack from "@/app/Components/DiamondStack";


const ResultsPage = () => {
  return (
    <div className="h-screen overflow-y-clip bg-white text-black">
      <Nav />

      <main className="relative flex h-[calc(100vh-88px)] items-center justify-around px-6 md:px-12">
        <h1 className="absolute left-4 top-0 text-[12px] font-semibold uppercase text-[#1A1B1C] md:left-10">
          A.I. Analysis
        </h1>

        {/* Preview box — top-right under nav */}
        <div
          aria-label="Preview"
          className="absolute right-6 top-0 z-30 w-32 h-38 border border-[#1A1B1C]/20 bg-[#F5F5F5] md:right-12"
        />

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
        <div className="absolute bottom-6 right-6 z-30 md:bottom-3 md:right-12">
          <Link
            href="/select"
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

        {/* Two diamond stacks */}
        <section className="relative z-10 flex w-full -translate-y-12.5 items-center justify-around">
          <div className="relative flex-none">
            <DiamondStack icon={cameraIcon} />
            <Image
              src={cameraTitle}
              alt="Allow A.I. to scan your face"
              className="pointer-events-none absolute left-[66%] top-[25%] w-[min(210px,19vw)] max-w-none"
            />
          </div>

          <div className="relative flex-none">
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
