import { useState } from "react";

const stepData = [
	{
		label: "Step 1",
	},
	{
		label: "Step 2",
	},
	{
		label: "Step 3",
	},
	{
		label: "Step 4",
	},
];

const Stepper = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const isNextBtnDisabled = currentStep === stepData.length;
	const isPreviousBtnDisabled = currentStep === 0;
	const progressPercent = Math.min(
		100,
		(currentStep / (stepData.length - 1)) * 100
	);
	function onStepClick(index: number) {
		setCurrentStep(index);
	}

	function moveStep(multiplier = 1) {
		setCurrentStep((p) => p + multiplier);
	}

	return (
		<div>
			<h1 className="text-2xl font-semibold mx-auto w-fit">Stepper</h1>
			<div className="w-[65%] mx-auto">
				<div className="w-full overflow-hidden flex flex-row justify-between relative">
					{stepData.map((data, i) => (
						<div
							key={i}
							className="flex flex-col w-full items-center justify-center"
						>
							<button
								onClick={() => onStepClick(i)}
								className={`size-7 rounded-full border-2 border-gray-900 cursor-pointer ${
									currentStep > i
										? "bg-green-400 text-white"
										: "bg-white text-black"
								}`}
							>
								{i + 1}
							</button>
							<p>{data.label}</p>
						</div>
					))}
					<div
						className="absolute bg-gray-400 top-3 left-7 -z-10"
						style={{
							width: `calc(100% - (100% / ${stepData.length}))`,
							marginLeft: `calc(100% / (${stepData.length} * 2.3))`,
						}}
					>
						<div
							className="border-2 transition-[width] border-green-500"
							style={{
								width: `${progressPercent}%`,
							}}
						></div>
					</div>
				</div>
				<div className="w-fit mx-auto flex flex-row gap-2">
					<button
						onClick={() => moveStep(-1)}
						disabled={isPreviousBtnDisabled}
						className="btn btn-primary btn-sm"
					>
						Previous
					</button>
					<button
						onClick={() => moveStep()}
						disabled={isNextBtnDisabled}
						className="btn btn-primary btn-sm"
					>
						{isNextBtnDisabled
							? "Finished"
							: currentStep === stepData.length - 1
							? "Finish"
							: "Next"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Stepper;
