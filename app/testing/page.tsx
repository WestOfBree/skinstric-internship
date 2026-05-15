"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import buttonIcon from "@/public/button-icon-shrunk.svg";
import Nav from "@/app/Components/Nav";
import RotatingDiamondRings from "@/app/Components/RotatingDiamondStack";
import axios from "axios";

type InputStep = "name" | "city" | "processing" | "done";

const NAME_STORAGE_KEY = "skinstric:userName";
const CITY_STORAGE_KEY = "skinstric:userCity";

const TestingPage = () => {
	const [step, setStep] = useState<InputStep>("name");
	const [nameValue, setNameValue] = useState("");
	const [cityValue, setCityValue] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [, setPhaseOneData] = useState<Record<string, unknown>[]>([]);

	const submitPhaseOne = async (name: string, city: string) => {
		const response = await axios.post(
			"https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
			{
				name,
				location: city,
			}
		);

		setPhaseOneData(response.data);
	};

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

	const handleEnter = async () => {
		if (isSubmitting) {
			return;
		}

		if (step === "name") {
			const trimmedName = nameValue.trim();

			if (!trimmedName) {
				setErrorMessage("Please enter your name.");
				return;
			}

			setErrorMessage("");
			setNameValue(trimmedName);
			setStep("city");
			return;
		}

		if (step === "city") {
			const trimmedName = nameValue.trim();
			const trimmedCity = cityValue.trim();

			if (!trimmedName || !trimmedCity) {
				setErrorMessage("Please enter both name and city.");
				return;
			}

			setErrorMessage("");
			setIsSubmitting(true);

			try {
				await submitPhaseOne(trimmedName, trimmedCity);
				window.localStorage.setItem(NAME_STORAGE_KEY, trimmedName);
				window.localStorage.setItem(CITY_STORAGE_KEY, trimmedCity);
				setCityValue(trimmedCity);
				setStep("processing");
			} catch (error) {
				const apiErrorMessage =
					axios.isAxiosError(error) && typeof error.response?.data?.message === "string"
						? error.response.data.message
						: "Unable to save your details right now. Please try again.";

				setErrorMessage(apiErrorMessage);
				console.error("Error posting data:", error);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key !== "Enter") {
			return;
		}

		event.preventDefault();
		void handleEnter();
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
					<RotatingDiamondRings>

						<div
							className={`absolute left-1/2 top-1/2 z-20 flex h-16.25 w-full max-w-md -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-transparent pt-1 ${
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
										disabled={isSubmitting}
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
						{errorMessage && (step === "name" || step === "city") && (
							<p className="mt-6 max-w-lg text-center text-sm text-[#B42318]" role="alert" aria-live="polite">
								{errorMessage}
							</p>
						)}
					</RotatingDiamondRings>
				</section>
			</main>
		</div>
	);
};

export default TestingPage;
