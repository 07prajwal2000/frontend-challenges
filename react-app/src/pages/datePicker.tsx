import React, { useReducer } from "react";
import { motion, AnimatePresence } from "framer-motion";

type StateType = {
	day: number;
	month: number;
	year: number;
	selectedDate: Date;
};

type ActionType =
	| { type: "set_day"; payload: number }
	| { type: "set_month"; payload: number }
	| { type: "set_year"; payload: number }
	| { type: "set_selected_date"; payload: Date };

function reducer(state: StateType, action: ActionType): StateType {
	switch (action.type) {
		case "set_day":
			return { ...state, day: action.payload };
		case "set_month":
			return { ...state, month: action.payload };
		case "set_year":
			return { ...state, year: action.payload };
		case "set_selected_date":
			return { ...state, selectedDate: action.payload };
		default:
			return state;
	}
}

const today = new Date();
const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const DatePicker = () => {
	const [state, dispatch] = useReducer(reducer, {
		day: today.getDate(),
		month: today.getMonth(),
		year: today.getFullYear(),
		selectedDate: today,
	});

	// First day of month, shifted to Monday start
	const firstDayOfMonth =
		(new Date(state.year, state.month, 1).getDay() + 6) % 7;

	const totalDaysInMonth = new Date(state.year, state.month + 1, 0).getDate();

	const navigateMonth = (mul: number = 1) => {
		let newMonth = state.month + mul;
		let newYear = state.year;
		if (newMonth < 0) {
			newMonth = 11;
			newYear -= 1;
		} else if (newMonth > 11) {
			newMonth = 0;
			newYear += 1;
		}
		dispatch({ type: "set_month", payload: newMonth });
		dispatch({ type: "set_year", payload: newYear });
	};

	const onYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = parseInt(e.target.value);
		if (!isNaN(value)) dispatch({ type: "set_year", payload: value });
	};

	const onDateSelected = (day: number) => {
		const newDate = new Date(state.year, state.month, day);
		dispatch({ type: "set_selected_date", payload: newDate });
		dispatch({ type: "set_day", payload: day });
	};

	return (
		<div className="max-w-[320px] mx-auto p-4 border rounded-md">
			{/* Year selector */}
			<select
				value={state.year}
				onChange={onYearChange}
				className="w-full mb-2 p-1 border rounded"
			>
				{generateYearsOptions(1990, 2030)}
			</select>

			{/* Month navigation */}
			<div className="flex justify-between items-center mb-2">
				<button
					onClick={() => navigateMonth(-1)}
					className="p-1 rounded-full border hover:bg-gray-100"
				>
					{"<"}
				</button>
				<h3 className="text-lg font-semibold">{monthNames[state.month]}</h3>
				<button
					onClick={() => navigateMonth(1)}
					className="p-1 rounded-full border hover:bg-gray-100"
				>
					{">"}
				</button>
			</div>

			{/* Week days */}
			<div className="grid grid-cols-7 text-center font-medium mb-1">
				{weeks.map((w) => (
					<div key={w}>{w}</div>
				))}
			</div>

			{/* Dates grid */}
			<AnimatePresence mode="wait">
				<motion.div
					key={`${state.month}-${state.year}`}
					className="grid grid-cols-7 gap-1"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
				>
					{Array.from({ length: firstDayOfMonth }).map((_, i) => (
						<div key={`empty-${i}`} />
					))}

					{Array.from({ length: totalDaysInMonth }).map((_, i) => {
						const day = i + 1;
						const isSelected =
							state.selectedDate.getDate() === day &&
							state.selectedDate.getMonth() === state.month &&
							state.selectedDate.getFullYear() === state.year;
						const isToday =
							today.getDate() === day &&
							today.getMonth() === state.month &&
							today.getFullYear() === state.year;

						return (
							<Cell
								key={day}
								highlight={isSelected}
								isToday={isToday}
								onClick={() => onDateSelected(day)}
							>
								{day}
							</Cell>
						);
					})}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

function generateYearsOptions(min = 1990, max = 2030) {
	const options: React.ReactNode[] = [];
	for (let i = min; i <= max; i++) {
		options.push(
			<option key={i} value={i}>
				{i}
			</option>
		);
	}
	return options;
}

function Cell({
	children,
	highlight,
	isToday,
	onClick,
}: {
	children?: React.ReactNode;
	highlight?: boolean;
	isToday?: boolean;
	onClick?: () => void;
}) {
	return (
		<div
			onClick={onClick}
			className={`w-10 h-10 flex items-center justify-center rounded-md cursor-pointer
        ${highlight ? "bg-blue-600 text-white" : "hover:bg-blue-100"}
        ${isToday ? "border-2 border-blue-400" : ""}
      `}
		>
			{children}
		</div>
	);
}

export default DatePicker;
