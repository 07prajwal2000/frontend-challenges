import React, { useReducer } from "react";

type ChipsStateType = {
	chips: string[];
	currentInput: string;
};

type ReducerActionType =
	| { type: "add_chip"; payload: { value: string; emptyInput?: boolean } }
	| { type: "on_input_change"; payload: string }
	| { type: "remove_chip"; payload: string }
	| { type: "remove_last" };

function reducer(
	state: ChipsStateType,
	action: ReducerActionType
): ChipsStateType {
	switch (action.type) {
		case "add_chip":
			if (!action.payload || state.chips.includes(action.payload.value))
				return state; // prevent duplicates
			state.chips = [...state.chips, action.payload.value];
			state.currentInput = action.payload.emptyInput ? "" : state.currentInput;
			return { ...state };

		case "on_input_change":
			return { ...state, currentInput: action.payload };

		case "remove_chip":
			return {
				...state,
				chips: state.chips.filter((x) => x !== action.payload),
			};
		case "remove_last":
			state.chips.pop();
			return { ...state };
		default:
			return state;
	}
}

const ChipsInput = () => {
	const [state, dispatch] = useReducer(reducer, {
		chips: [],
		currentInput: "",
	});

	function removeChip(chip: string) {
		dispatch({ type: "remove_chip", payload: chip });
	}

	function onInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		const value = e.currentTarget.value.trim();
		if (!value) {
			if (e.key == "Backspace" && state.chips.length > 0) {
				dispatch({ type: "remove_last" });
				return;
			}
		}

		if (e.key === "Enter") {
			dispatch({ type: "add_chip", payload: { value, emptyInput: true } });
		}
	}

	return (
		<div className="p-2">
			<div className="border rounded p-2 max-w-[350px] flex flex-wrap gap-2 items-center">
				{state.chips.map((chip, i) => (
					<div
						key={i}
						className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full"
					>
						<span>{chip}</span>
						<button
							onClick={() => removeChip(chip)}
							className="text-sm text-red-600 font-bold hover:text-red-800"
						>
							x
						</button>
					</div>
				))}

				{/* Input should shrink until it has no space, then wrap */}
				<input
					type="text"
					value={state.currentInput}
					onKeyDown={onInputKeyPress}
					onChange={(e) =>
						dispatch({ type: "on_input_change", payload: e.target.value })
					}
					className="flex-grow min-w-[80px] outline-none text-lg bg-transparent"
					placeholder="Add chip..."
				/>
			</div>
		</div>
	);
};

export default ChipsInput;
