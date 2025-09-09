import React, { useRef, useState } from "react";

const Otp = () => {
	const otpLength = 6;
	const [otp, setOtp] = useState(Array<string>(otpLength).fill(""));
	const otpInputParentRef = useRef<HTMLDivElement>(null);
	// 0 - not yet, 1 - loading, 2 - success, 3 - fail
	const [submissionState, setSubmissionState] = useState(0);

	function setOtpValue(e: React.ChangeEvent<HTMLInputElement>, index: number) {
		if (submissionState == 1) return;
		const rawValue = e.currentTarget.value;
		const value = rawValue.substring(0, 1);
		if (value && !isNumber(value)) return;
		const newOtp = [...otp];
		newOtp[index] = value;
		let canSubmit =
			index + 1 == otpLength && newOtp.every((num) => num.length == 1);
		setOtp(newOtp);
		if (value.length == 0 && index - 1 > -1) {
			(
				otpInputParentRef.current?.children[index - 1] as HTMLInputElement
			)?.focus();
			return;
		}
		if (index + 1 < otpLength && value) {
			(
				otpInputParentRef.current?.children[index + 1] as HTMLInputElement
			)?.focus();
		}
		if (canSubmit) {
			submitOtp();
		}
	}

	function submitOtp() {
		setSubmissionState(1);
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

	function onInputClick(e: React.MouseEvent<HTMLInputElement>) {
		if (!e.currentTarget.value) return;
		e.currentTarget.selectionEnd = 1;
		e.currentTarget.selectionStart = 1;
	}

	return (
		<div>
			<div className="p-4 flex flex-col justify-center items-center gap-2 mx-auto w-[70%]">
				<h2 className="text-xl font-semibold">Enter OTP</h2>
				<hr />
				<div className="flex flex-row gap-2" ref={otpInputParentRef}>
					{otp.map((o, i) => (
						<input
							onClick={onInputClick}
							onChange={(e) => setOtpValue(e, i)}
							key={i}
							type="text"
							minLength={0}
							disabled={submissionState == 1}
							maxLength={1}
							className="w-10 text-center input input-primary disabled:bg-gray-200"
							value={o}
						/>
					))}
				</div>
				{submissionState == 1 && (
					<h3 className="text-lg text-yellow-700 animate-pulse font-semibold">
						Validating OTP
					</h3>
				)}
				{submissionState == 2 && (
					<h3 className="text-lg text-green-700 font-semibold">Success</h3>
				)}
				{submissionState == 3 && (
					<h3 className="text-lg text-red-700 font-semibold">Invalid OTP</h3>
				)}
			</div>
		</div>
	);
};

export default Otp;
