"use client";

import Nav from "@/app/Components/Nav";
import DiamondStack from "@/app/Components/DiamondStack";
import cameraIcon from "@/public/camera-icon.svg";

const CameraLoadingPage = () => {
	return (
		<div className="h-screen overflow-y-clip bg-white text-black">
			<Nav />

			<main className="relative flex h-[calc(100vh-88px)] items-center justify-center px-6 md:px-12">
				<h1 className="absolute left-4 top-0 text-[12px] font-semibold uppercase text-[#1A1B1C] md:left-10">
					A.I. Analysis
				</h1>

				<section className="flex flex-col items-center justify-center gap-4 text-center">
					<DiamondStack icon={cameraIcon} />

					<div className="space-y-1">
						<p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1A1B1C]/60">
							Loading camera scan
						</p>
						<p className="text-sm font-medium text-[#1A1B1C]">
							Preparing your analysis view...
						</p>
					</div>
				</section>
			</main>
		</div>
	);
};

export default CameraLoadingPage;
