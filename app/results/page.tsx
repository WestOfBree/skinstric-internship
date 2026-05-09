import Image from "next/image";
import Link from "next/link";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import Nav from "@/app/Components/Nav";

const DiamondStack = () => (
	<div className="relative flex h-[min(380px,36vw)] w-[min(380px,36vw)] items-center justify-center">
		{/* Outer ring */}
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 z-0 animate-[spin_40s_linear_infinite] opacity-35"
		>
			<svg className="absolute inset-0 rotate-45" viewBox="0 0 100 100" aria-hidden="true">
				<rect
					x="1"
					y="1"
					width="96"
					height="96"
					fill="none"
					stroke="#A0A4AB"
					strokeOpacity="0.25"
					strokeWidth="0.45"
					strokeDasharray="0.1 1.4"
					strokeLinecap="round"
				/>
			</svg>
		</div>

		{/* Middle ring */}
		<div
			aria-hidden="true"
			className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[93.5%] w-[93.5%] -translate-x-1/2 -translate-y-1/2 animate-[spin_56s_linear_infinite] opacity-65"
		>
			<svg className="absolute inset-0 rotate-45" viewBox="0 0 100 100" aria-hidden="true">
				<rect
					x="1"
					y="1"
					width="96"
					height="96"
					fill="none"
					stroke="#A0A4AB"
					strokeOpacity="0.55"
					strokeWidth="0.35"
					strokeDasharray="0.1 1.6"
					strokeLinecap="round"
				/>
			</svg>
		</div>

		{/* Inner ring */}
		<div
			aria-hidden="true"
			className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 animate-[spin_72s_linear_infinite] opacity-100"
		>
			<svg className="absolute inset-0 rotate-45" viewBox="0 0 100 100" aria-hidden="true">
				<rect
					x="1"
					y="1"
					width="96"
					height="96"
					fill="none"
					stroke="#A0A4AB"
					strokeOpacity="0.9"
					strokeWidth="0.3"
					strokeDasharray="0.1 1.8"
					strokeLinecap="round"
				/>
			</svg>
		</div>

		{/* Icon placeholder */}
		<div
			aria-label="Result icon"
			className="relative z-20 h-34 w-34 border border-dashed border-[#A0A4AB]/50 bg-[#F5F5F5]"
		/>
	</div>
);

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
						href="/"
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
					<DiamondStack />
					<DiamondStack />
				</section>
			</main>
		</div>
	);
};

export default ResultsPage;
