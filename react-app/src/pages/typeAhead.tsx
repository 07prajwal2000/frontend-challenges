import { useState } from "react";
import { countries } from "../constants/countries";

const TypeAhead = () => {
	const [search, setSearch] = useState("");
	const [navigated, setNavigated] = useState(-1);
	const [hide, setHide] = useState(true);
	const maxFilter = 7;
	const filteredCountries = countries
		.filter((country) => country.includes(search.toLowerCase()))
		.slice(0, maxFilter);

	function onChange(value: string) {
		setSearch(value);
		setNavigated(-1);
		setHide(false);
	}

	function onKeyDown(key: string) {
		if (key == "Enter" && navigated != -1) {
			setSearch(filteredCountries[navigated]);
			setNavigated(-1);
			setHide(true);
		}
		if (!(key == "ArrowUp" || key == "ArrowDown")) {
			return;
		}
		let mul = -1;
		if (key == "ArrowDown") mul = 1;
		setNavigated((p) => (p + mul) % filteredCountries.length);
	}

	return (
		<div>
			<div className="w-[50%] mx-auto mt-4">
				<input
					placeholder="Search Country"
					type="text"
					value={search}
					onKeyDown={(e) => onKeyDown(e.key)}
					onChange={(e) => onChange(e.currentTarget.value)}
					className="border-2 outline-none rounded-md w-full border-blue-600 text-lg p-2"
				/>
				{search && !hide && (
					<div className="w-full max-h-[40vh] border overflow-y-auto">
						{filteredCountries.map((country, i) => (
							<div
								key={country}
								onMouseEnter={() => setNavigated(i)}
								onClick={() => onKeyDown("Enter")}
								autoFocus={navigated == i}
								className={`py-1 ${
									navigated == i && "bg-green-600 text-white"
								}`}
							>
								{country}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default TypeAhead;
