import { useState } from "react";

const TelephoneFormatter = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [pattern, setPattern] = useState("+(000) 000 0000");

	function onKeyDown(key: string) {
		const isNum = Number.isInteger(+key);
		if (key == "Backspace") {
			setPhoneNumber((p) => p.substring(0, p.length - 1));
			return;
		}
		if (getTotalDigits() == phoneNumber.length) return;
		if (!isNum) return;
		setPhoneNumber((p) => p + key);
	}

	function getTotalDigits() {
		let count = 0;
		for (let char of pattern) {
			if (char == "0") count++;
		}
		return count;
	}

	function getFormattedValue() {
		const formatted: string[] = [];
		let patternIdx = 0,
			numberIdx = 0;
		while (patternIdx < pattern.length && numberIdx < phoneNumber.length) {
			const curPattern = pattern[patternIdx];
			const curNumber = phoneNumber[numberIdx];
			if (curPattern == "0") {
				formatted.push(curNumber);
				patternIdx++;
				numberIdx++;
			} else {
				formatted.push(curPattern);
				patternIdx++;
			}
		}
		return formatted.join("");
	}

	function onPatternChange(value: string) {
		setPattern(value);
		setPhoneNumber("");
	}

	return (
		<div>
			<h2 className="text-2xl font-semibold">Telephone Formatter</h2>
			<div className="p-4 flex flex-col gap-4">
				<input
					type="text"
					placeholder="Enter pattern"
					className="input input-success"
					onChange={(e) => onPatternChange(e.target.value)}
					value={pattern}
				/>
				<input
					type="text"
					className="input input-primary"
					placeholder="Enter phone"
					onKeyDown={(e) => onKeyDown(e.key)}
					value={getFormattedValue()}
				/>
			</div>
		</div>
	);
};

export default TelephoneFormatter;
