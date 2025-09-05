import { useEffect, useState } from "react";

const countries: Record<string, string> = {
	India: "Delhi",
	USA: "Washington DC",
	UK: "London",
	Germany: "Berlin",
	Netherlands: "Amsterdam",
	France: "Paris",
	Italy: "Rome",
	Switzerland: "Zurich",
	Canada: "Ottawa",
	China: "Beijing",
	Russia: "Moscow",
	Sweden: "Stockholm",
	Finland: "Helsinki",
	Denmark: "Copenhagen",
	Austria: "Vienna",
	Belgium: "Brussels",
	Czechia: "Prague",
	Poland: "Warsaw",
	Norway: "Oslo",
	Brazil: "Brazilia",
	Portugal: "Lisbon",
};

function generateRandomQASubset(count: number = 5) {
	const countriesSubset = Array<string>();

	while (count > 0) {
		for (let country in countries) {
			const probability = Math.random() > 0.5;
			if (!probability) continue;
			count--;
			countriesSubset.push(country);
			countriesSubset.push(countries[country]);
			if (count == 0) break;
		}
	}
	// shuffle
	for (let i = 0; i < countriesSubset.length; i++) {
		const possibleIdx = Math.floor(Math.random() * countriesSubset.length);
		const tmp = countriesSubset[i];
		countriesSubset[i] = countriesSubset[possibleIdx];
		countriesSubset[possibleIdx] = tmp;
	}
	return countriesSubset;
}

const GroupWords = () => {
	const [qna, setQna] = useState(generateRandomQASubset());
	const [selected, setSelected] = useState<string[]>([]);
	// 0 - none, 1 - success, 2 - error
	const [state, setState] = useState(0);

	useEffect(() => {
		if (qna.length == 0) {
			setQna(generateRandomQASubset());
		}
	}, [qna]);

	function isSelected(val: string) {
		return selected.includes(val);
	}
	function onClick(value: string) {
		if (state != 0) return;
		if (selected.includes(value)) {
			setSelected([]);
			return;
		}
		const newSelected = [...selected, value];
		setSelected(newSelected);
		if (newSelected.length != 2) return;
		const isValid = validate(newSelected);
		setState(isValid ? 1 : 2);
		setTimeout(() => {
			clearSelection();
			setState(0);
			if (isValid) {
				setQna(qna.filter((q) => !newSelected.includes(q)));
			}
		}, 1000);
	}

	function clearSelection() {
		setSelected([]);
	}

	function validate(values: string[]) {
		const lhs = values[0] in countries && countries[values[0]] === values[1];
		const rhs = values[1] in countries && countries[values[1]] === values[0];
		return lhs || rhs;
	}

	function isError() {
		return state == 2;
	}
	function isSuccess() {
		return state == 1;
	}
	function isPending() {
		return state == 0;
	}

	return (
		<div>
			<div className="flex flex-row my-2 max-w-[650px] mx-auto flex-wrap justify-center items-center gap-4">
				{qna.map((x) => (
					<div
						onClick={() => onClick(x)}
						className={`px-2 py-1 border-2 rounded-md cursor-pointer ${
							isSelected(x)
								? `
              ${isError() && "bg-red-700 text-white"}
              ${isSuccess() && "bg-green-700 text-white"}
              ${isPending() && "bg-violet-700 text-white"}
              `
								: "hover:bg-violet-100"
						}`}
						key={x}
					>
						{x}
					</div>
				))}
			</div>
		</div>
	);
};

export default GroupWords;
