import { useEffect, useState } from "react";

const TrafficLight = () => {
	const [currentActive, setCurrentActive] = useState<
		"red" | "yellow" | "green"
	>("red");
	const isRed = currentActive === "red";
	const isYellow = currentActive === "yellow";
	const isGreen = currentActive === "green";

	useEffect(() => {
		turnOnRed();
	}, []);

	function turnOnRed() {
		setCurrentActive("red");
		setTimeout(turnOnYellow, 4000);
	}
	function turnOnYellow() {
		setCurrentActive("yellow");
		setTimeout(turnOnGreen, 1000);
	}
	function turnOnGreen() {
		setCurrentActive("green");
		setTimeout(turnOnRed, 3000);
	}

	return (
		<div className="p-4">
			<h2>Traffic Lights</h2>
			<div className="bg-gray-900 p-3 w-fit rounded-xl flex flex-col gap-3">
				<div
					className={`size-14 rounded-full ${
						isRed ? "bg-red-500" : "bg-gray-500"
					}`}
				/>
				<div
					className={`size-14 rounded-full ${
						isYellow ? "bg-yellow-400" : "bg-gray-500"
					}`}
				/>
				<div
					className={`size-14 rounded-full ${
						isGreen ? "bg-green-500" : "bg-gray-500"
					}`}
				/>
			</div>
		</div>
	);
};

export default TrafficLight;
