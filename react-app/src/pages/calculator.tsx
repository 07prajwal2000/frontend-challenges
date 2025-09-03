import { useState } from "react";

const keys = [
	["AC", "%", "/", "x"],
	["7", "8", "9", "-"],
	["4", "5", "6", "+"],
	["1", "2", "3", "("],
	["0", ".", "=", ")"],
];

const keyColors: Record<string, number> = {
	AC: 1,
	"%": 2,
	"/": 2,
	x: 2,
	"-": 2,
	"+": 2,
	"=": 3,
	"(": 2,
	")": 2,
};

const Calculator = () => {
	const [expr, setExpr] = useState("");
	function getColor(key: string) {
		return key in keyColors ? keyColors[key] : -1;
	}

	function onKeyPress(key: string) {
		let newExpr = expr;
		try {
			if (key == "x") newExpr += "*";
			else if (key == "AC") newExpr = "";
			else if (key == "=") newExpr = eval(newExpr);
			else newExpr += key;
		} catch (error) {
			newExpr = "ERROR";
		}
		setExpr(newExpr);
	}

	return (
		<div className="flex p-4 flex-col gap-2 bg-gray-700 w-fit">
			<input
				className="bg-white mb-2 overflow-x-auto text-nowrap p-2 rounded-sm text-lg text-right outline-none sele"
				value={expr}
				readOnly
			/>
			{keys.map((row, i) => (
				<div key={i} className="flex flex-row gap-2">
					{row.map((key) => (
						<Key
							onKeyPress={onKeyPress}
							code={key}
							color={getColor(key)}
							key={key}
						/>
					))}
				</div>
			))}
		</div>
	);
};

function Key({
	code,
	color,
	onKeyPress,
}: {
	code: string;
	color: number;
	onKeyPress: (key: string) => void;
}) {
	function onBtnClick() {
		onKeyPress(code);
	}

	return (
		<div
			onClick={onBtnClick}
			className={`size-12 flex text-white justify-center items-center rounded-full ${
				color == 1 && "bg-zinc-600 hover:bg-zinc-700"
			} 
      ${color == 2 && "bg-amber-400 hover:bg-amber-500"}
      ${color == 3 && "bg-green-500 hover:bg-green-600"}
      ${color == -1 && "bg-gray-600 hover:bg-gray-700"}
       cursor-pointer`}
		>
			<span>{code}</span>
		</div>
	);
}

export default Calculator;
