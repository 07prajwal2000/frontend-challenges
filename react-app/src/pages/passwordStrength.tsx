import React, { useState } from "react";

const strengthLevelLabels = [
	"Weakest",
	"Weak",
	"Ok",
	"Good",
	"Strong",
	"Strongest",
];

const PasswordStrength = () => {
	const [password, setPassword] = useState("");
	// 0 weak, 1 - ok, 2 - strong
	const [strengthLevel, setStrengthLevel] = useState(0);
	const [passwordStrength, setPasswordStrength] = useState([
		{
			name: "Capital letter(s)",
			satisfied: false,
			regex: /[A-Z]/,
			required: false,
		},
		{
			name: "Small letter(s)",
			satisfied: false,
			regex: /[a-z]/,
			required: false,
		},
		{
			name: "Number(s)",
			satisfied: false,
			regex: /[0-9]/,
			required: false,
		},
		{
			name: "Symbol",
			satisfied: false,
			regex: /[^A-Za-z0-9]/,
			required: false,
		},
		{
			name: "Min Length 8",
			satisfied: false,
			regex: /^.{8,}$/,
			required: true,
		},
		{
			name: "Min Length 16",
			satisfied: false,
			regex: /^.{16,}$/,
		},
	]);
	const totalWidth = Math.ceil((strengthLevel / passwordStrength.length) * 100);

	function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		setPassword(value);
		const newPwdStrength = [...passwordStrength];
		let validCount = 0;
		for (let meter of newPwdStrength) {
			const isValid = new RegExp(meter.regex).test(value);
			meter.satisfied = isValid;
			validCount += isValid ? 1 : 0;
		}
		setPasswordStrength(newPwdStrength);
		setStrengthLevel(validCount);
	}

	return (
		<div className="container">
			<div className="mx-auto grid grid-cols-12 w-[50%] border-2 border-primary p-4 rounded-md">
				<div className="col-span-2"></div>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={onPasswordChange}
					aria-label="Password"
					aria-description="Please enter your password"
					className="input col-span-8 w-full input-primary"
				/>
				<div className="col-span-2"></div>
				<div className="col-span-12 items-center mt-4 flex flex-col gap-2">
					<h2 className="text-xl font-semibold w-fit">
						Password Strength :{" "}
						{strengthLevelLabels[strengthLevel - 1] || strengthLevelLabels[0]}
					</h2>
					<div className="w-[70%] h-3 overflow-hidden rounded-full border">
						<div
							style={{
								width: `${totalWidth}%`,
							}}
							className={`h-full transition-[width]
								${strengthLevel == 1 && "bg-red-600"}
								${strengthLevel == 2 && "bg-red-400"}
								${strengthLevel == 3 && "bg-amber-300"}
								${strengthLevel == 4 && "bg-amber-500"}
								${strengthLevel == 5 && "bg-green-400"}
								${strengthLevel == 6 && "bg-green-600"}
							`}
						></div>
					</div>
					<div>
						{passwordStrength.map((meter) => (
							<div
								className="flex flex-row w-fit gap-2 justify-between items-center"
								key={meter.name}
							>
								<p>{meter.satisfied ? "✅" : "❌"}</p>
								<p>{meter.name}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PasswordStrength;
