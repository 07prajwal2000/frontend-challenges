import { useRef, useState } from "react";

function useDebounce(callback: Function, time: number) {
	const timeoutId = useRef<number>(null);
	return function (...args: any) {
		if (timeoutId.current) {
			clearTimeout(timeoutId.current);
			timeoutId.current = null;
		}
		timeoutId.current = setTimeout(() => {
			callback.apply(null, args);
		}, time);
	};
}

function useThrottle(callback: Function, time: number) {
	let throttled = useRef<boolean>(false);
	let prevArgs = useRef<any>(null);
	return function (...args: any) {
		if (throttled.current) {
			prevArgs.current = args;
			return;
		}
		throttled.current = true;
		setTimeout(() => {
			callback.apply(null, prevArgs.current ?? args);
			throttled.current = false;
			prevArgs.current = null;
		}, time);
		prevArgs.current = args;
	};
}

const DebounceThrottle = () => {
	const [value, setValue] = useState("");
	const [debouncedValue, setDebouncedValue] = useState("");
	const [throttledValue, setThrottledValue] = useState("");
	const throttle = useThrottle(throttledCallback, 500);
	const debounce = useDebounce(debouncedCallback, 1500);

	function debouncedCallback(value: string) {
		setDebouncedValue(value);
	}
	function throttledCallback(value: string) {
		setThrottledValue(value);
	}

	function onInputChange(val: string) {
		setValue(val);
		debounce(val);
		throttle(val);
	}

	return (
		<div>
			<h1>Debounce & Throttle</h1>
			<input
				type="text"
				className="input input-primary"
				value={value}
				onChange={(e) => onInputChange(e.currentTarget.value)}
			/>
			<p>Normal: {value}</p>
			<p>Debounced Value: {debouncedValue}</p>
			<p>Throttled Value: {throttledValue}</p>
		</div>
	);
};

export default DebounceThrottle;
