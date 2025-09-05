import { useState } from "react";

function sleep(duration: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
}

const Counter = () => {
	const [counter, setCounter] = useState(0);
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [isAsync, setIsAsync] = useState(false);

	async function wait() {
		setLoading(true);
		if (isAsync) await sleep(1000);
		setLoading(false);
	}

	async function changeValue(mul = 1) {
		await wait();
		setCounter((p) => p + step * mul);
	}
	async function onStepChange(value: number) {
		setStep(value);
	}
	function onAsyncChange(value: boolean) {
		setIsAsync(value);
	}

	function increment() {
		changeValue();
	}
	function decrement() {
		changeValue(-1);
	}

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<h2>Counter</h2>
			<div className="flex flex-row justify-center items-center gap-4">
				<button disabled={loading} onClick={decrement} className="btn">
					-
				</button>
				<input
					type="text"
					className="w-24 text-center"
					value={counter}
					readOnly
				/>
				<button disabled={loading} onClick={increment} className="btn">
					+
				</button>
			</div>
			<div>
				<h2>Settings</h2>
				<label className="flex flex-row items-center justify-center gap-2">
					Step
					<input
						onChange={(e) => onStepChange(parseInt(e.target.value))}
						type="number"
						value={step}
						className="w-24"
					/>
				</label>
				<label className="flex flex-row items-center justify-center gap-2">
					Is Async
					<input
						onChange={(e) => onAsyncChange(e.target.checked)}
						type="checkbox"
						checked={isAsync}
						className="w-24"
					/>
				</label>
			</div>
		</div>
	);
};

export default Counter;
