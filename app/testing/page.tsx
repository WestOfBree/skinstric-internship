import Image from "next/image";
import Link from "next/link";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import Nav from "@/app/Components/Nav";

const TestingPage = () => {
	return (
		<div className="min-h-screen bg-white text-black">
			<Nav />

			<main className="relative flex min-h-[calc(100vh-88px)] items-center justify-center overflow-hidden px-6 md:px-12">
				<h1 className="absolute left-4 top-0 text-[12px] font-normal text-[#1A1B1C] md:left-10">
					To Start Analysis
				</h1>

				<div className="absolute bottom-6 left-6 md:bottom-16 md:left-12">
					<Link
						href="/"
						aria-label="Go back"
						className="group inline-flex h-9 items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors"
					>
						<div className="relative mr-2 inline-block h-10.5 w-10.5 shrink-0">
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

				<section className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8 text-center">
					  <div className="relative flex h-105 w-105 items-center justify-center sm:h-125 sm:w-125">
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 animate-[spin_40s_linear_infinite]"
						>
							<svg
								className="absolute inset-0 rotate-45"
								viewBox="0 0 100 100"
								aria-hidden="true"
							>
								<rect
									x="1"
									y="1"
									width="96"
									height="96"
									fill="none"
									stroke="#A0A4AB"
									strokeWidth="0.7"
									strokeDasharray="0.2 2.2"
									strokeLinecap="round"
								/>
							</svg>
						</div>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-8 animate-[spin_56s_linear_infinite]"
						>
							<svg
								className="absolute inset-0 rotate-45"
								viewBox="0 0 100 100"
								aria-hidden="true"
							>
								<rect
									x="1"
									y="1"
									width="96"
									height="96"
									fill="none"
									stroke="#A0A4AB"
									strokeOpacity="0.75"
									strokeWidth="0.6"
									strokeDasharray="0.2 2.5"
									strokeLinecap="round"
								/>
							</svg>
						</div>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-16 animate-[spin_72s_linear_infinite]"
						>
							<svg
								className="absolute inset-0 rotate-45"
								viewBox="0 0 100 100"
								aria-hidden="true"
							>
								<rect
									x="1"
									y="1"
									width="96"
									height="96"
									fill="none"
									stroke="#A0A4AB"
									strokeOpacity="0.5"
									strokeWidth="0.5"
									strokeDasharray="0.2 2.8"
									strokeLinecap="round"
								/>
							</svg>
						</div>

						<div className="relative z-20 w-full max-w-[320px] rounded-full border border-[#1A1B1C]/20 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-sm">
							<label htmlFor="name" className="sr-only">
								Your name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Enter your name"
								className="w-full bg-transparent text-center text-base uppercase tracking-[0.12em] text-[#1A1B1C] placeholder:text-[#1A1B1C]/45 focus:outline-none"
							/>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default TestingPage;
