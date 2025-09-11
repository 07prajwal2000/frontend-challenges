import React, { useRef, useState } from "react";

const Otp = () => {
	const otpLength = 6;
	const [otp, setOtp] = useState(Array<string>(otpLength).fill(""));
	const otpInputParentRef = useRef<HTMLDivElement>(null);
	// 0 - not yet, 1 - loading, 2 - success, 3 - fail
	const [submissionState, setSubmissionState] = useState(0);
	const inputElements = useRef<HTMLInputElement[]>([]);
	const canInput = submissionState == 0;
	const isLoading = submissionState == 1;
	const isSuccess = submissionState == 2;
	const isFailure = submissionState == 3;

	function setOtpValue(e: React.ChangeEvent<HTMLInputElement>, index: number) {
		if (!canInput) return;
		const rawValue = e.currentTarget.value;
		const value = rawValue.substring(
			e.currentTarget.selectionStart! - 1,
			e.currentTarget.selectionStart!
		);
		if (!isNumber(value)) return;
		const otpCopy = [...otp];
		otpCopy[index] = value;
		setOtp(otpCopy);
		inputElements.current[index + 1]?.focus();
		if (index + 1 === otpLength) submitOtp(otpCopy);
	}

	function onPaste(e: React.ClipboardEvent<HTMLInputElement>, index: number) {
		const pastedValue = e.clipboardData.getData("text");
		const newOtp = [...otp];
		const len = Math.min(pastedValue.length, otpLength);
		for (let i = 0; i < len; i++) {
			const pastedChar = pastedValue[i];
			if (!isNumber(pastedChar)) return;
			newOtp[i] = pastedChar;
		}
		setOtp(newOtp);

		if (index + pastedValue.length >= otpLength) submitOtp(newOtp);
	}

	function handleKeyPress(
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) {
		const key = e.key;
		if (key == "Backspace") {
			const otpCopy = [...otp];
			otpCopy[index] = "";
			handleFocus(inputElements.current[index - 1]);
			setOtp(otpCopy);
		} else if (key == "ArrowLeft") {
			handleFocus(inputElements.current[index - 1]);
		} else if (key == "ArrowRight") {
			handleFocus(inputElements.current[index + 1]);
		}
	}

	function handleFocus(input?: HTMLInputElement) {
		if (!input) return;
		input.focus();
	}

	function submitOtp(values: string[]) {
		setSubmissionState(1);
		console.log("Submitting OTP", values);
		setTimeout(() => {
			const status = Math.random() * 100;
			setSubmissionState(status > 80 ? 3 : 2); // 80% success rate
			setTimeout(() => {
				setSubmissionState(0);
			}, 1000);
		}, 2500);
	}

	function isNumber(val: string) {
		const start = "0".charCodeAt(0);
		const end = "9".charCodeAt(0);
		const valCode = val.charCodeAt(0);
		return valCode >= start && valCode <= end;
	}

	return (
		<div>
			<div className="p-4 flex flex-col justify-center items-center gap-2 mx-auto w-[70%]">
				<h2 className="text-xl font-semibold">Enter OTP</h2>
				<hr />
				<div className="flex flex-row gap-2" ref={otpInputParentRef}>
					{otp.map((o, i) => (
						<input
							onChange={(e) => setOtpValue(e, i)}
							onPaste={(e) => onPaste(e, i)}
							ref={(el) => {
								inputElements.current[i] = el!;
							}}
							key={i}
							onKeyDown={(e) => handleKeyPress(e, i)}
							type="text"
							inputMode="numeric"
							disabled={isLoading}
							className="w-10 text-center input input-primary disabled:bg-gray-200"
							value={o}
						/>
					))}
				</div>
				{isLoading && (
					<h3 className="text-lg text-yellow-700 animate-pulse font-semibold">
						Validating OTP
					</h3>
				)}
				{isSuccess && (
					<h3 className="text-lg text-green-700 font-semibold">Success</h3>
				)}
				{isFailure && (
					<h3 className="text-lg text-red-700 font-semibold">Invalid OTP</h3>
				)}
			</div>
		</div>
	);
};

export default Otp;
