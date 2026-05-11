"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import Nav from "@/app/Components/Nav";

type InputStep = "name" | "city" | "processing" | "done";

const NAME_STORAGE_KEY = "skinstric:userName";
const CITY_STORAGE_KEY = "skinstric:userCity";

const TestingPage = () => {
	const [step, setStep] = useState<InputStep>("name");
	const [nameValue, setNameValue] = useState("");
	const [cityValue, setCityValue] = useState("");

	useEffect(() => {
		if (step !== "processing") {
			return;
		}

		// Simulate async processing before enabling the next action.
		const timeoutId = window.setTimeout(() => {
			setStep("done");
		}, 2200);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [step]);

	const handleEnter = () => {
		if (step === "name") {
			const trimmedName = nameValue.trim();

			if (!trimmedName) {
				return;
			}

			window.localStorage.setItem(NAME_STORAGE_KEY, trimmedName);
			setStep("city");
			return;
		}

		if (step === "city") {
			const trimmedCity = cityValue.trim();

			if (!trimmedCity) {
				return;
			}

			window.localStorage.setItem(CITY_STORAGE_KEY, trimmedCity);
			setStep("processing");
		}
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key !== "Enter") {
			return;
		}

		event.preventDefault();
		handleEnter();
	};

	return (
		<div className="h-screen overflow-y-clip bg-white text-black">
			<Nav />

			<main className="relative flex h-[calc(100vh-88px)] items-center justify-center px-6 md:px-12">
				<h1 className="absolute left-4 top-0 text-[12px] font-semibold uppercase text-[#1A1B1C] md:left-10">
					To Start Analysis
				</h1>

				<div className="absolute bottom-6 left-6 md:bottom-3 md:left-12">
					<Link
						href="/"
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

				<div
					className={`absolute bottom-6 right-6 z-30 transition-all duration-900 ease-in-out md:bottom-3 md:right-12 ${
						step === "done"
							? "translate-x-0 opacity-100"
							: "pointer-events-none -translate-x-10 opacity-0"
					}`}
				>
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

				<section className="relative z-10 flex w-full max-w-3xl -translate-y-12.5 flex-col items-center gap-8 text-center">
					  <div className="relative flex h-[min(580px,68vw)] w-[min(580px,68vw)] items-center justify-center">
						<div
							aria-hidden="true"
							className="pointer-events-none absolute inset-0 z-0 animate-[spin_40s_linear_infinite]"
						>
							<svg
								className="absolute inset-0 rotate-45"
								viewBox="0 0 100 100"
								aria-hidden="true"
								style={{ opacity: 0.3 }}
							>
								<rect
									x="1"
									y="1"
									width="96"
									height="96"
									fill="none"
									stroke="#A0A4AB"
									strokeOpacity="0.3"
									strokeWidth="0.45"
									strokeDasharray="0.1 1.4"
									strokeLinecap="round"
								/>
							</svg>
						</div>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[93.5%] w-[93.5%] -translate-x-1/2 -translate-y-1/2 animate-[spin_56s_linear_infinite]"
						>
							<svg
								className="absolute inset-0 rotate-45"
								viewBox="0 0 100 100"
								aria-hidden="true"
								style={{ opacity: 0.6 }}
							>
								<rect
									x="1"
									y="1"
									width="96"
									height="96"
									fill="none"
									stroke="#A0A4AB"
									strokeOpacity="0.6"
									strokeWidth="0.35"
									strokeDasharray="0.1 1.6"
									strokeLinecap="round"
								/>
							</svg>
						</div>
						<div
							aria-hidden="true"
							className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 animate-[spin_72s_linear_infinite] opacity-100"
						>
							<svg
								className="absolute inset-0 rotate-45"
								viewBox="0 0 100 100"
								aria-hidden="true"
								style={{ opacity: 1 }}
							>
								<rect
									x="1"
									y="1"
									width="96"
									height="96"
									fill="none"
									stroke="#A0A4AB"
									strokeOpacity="1"
									strokeWidth="0.3"
									strokeDasharray="0.1 1.8"
									strokeLinecap="round"
								/>
							</svg>
						</div>

						<div
							className={`absolute left-1/2 top-1/2 z-20 flex h-16.25 w-full max-w-108 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-transparent pt-1 ${
								step === "name" || step === "city" ? "border-b border-[#1A1B1C]" : ""
							}`}
						>
							{(step === "name" || step === "city") && (
								<span className="absolute -top-5 left-1/2 mb-0 block -translate-x-1/2 text-xs uppercase tracking-[0.12em] text-gray-400">
									CLICK TO TYPE
								</span>
							)}
							{(step === "name" || step === "city") && (
								<>
									<label htmlFor="analysis-input" className="sr-only">
										{step === "name" ? "Your name" : "Your city name"}
									</label>
									<input
										id="analysis-input"
										name="analysis-input"
										type="text"
										placeholder={step === "name" ? "Introduce Yourself" : "your city name"}
										value={step === "name" ? nameValue : cityValue}
										onChange={(event) => {
											if (step === "name") {
												setNameValue(event.target.value);
												return;
											}

											setCityValue(event.target.value);
										}}
										onKeyDown={handleKeyDown}
										className="h-full w-full bg-transparent text-center text-[54px] leading-none text-[#1A1B1C] placeholder:text-[#1A1B1C] focus:outline-none focus:bg-white"
									/>
								</>
							)}
							{step === "processing" && (
								<p className="text-center text-[20px] font-semibold uppercase tracking-[0.18em] text-[#1A1B1C] animate-pulse">
									Processing...
								</p>
							)}
							{step === "done" && (
								<div className="flex flex-col items-center gap-4 z-10">
								<p className="text-2xl font-normal tracking-wide text-[#1A1B1C]">
									Thank you!
								</p>
								<p className="text-lg text-gray-600">
									Proceed to the next step
								</p>
								</div>
							)}
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default TestingPage;
