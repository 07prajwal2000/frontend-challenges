import { useEffect, useReducer, useRef, useState } from "react";

type Timestamp = {
	hour: number;
	minute: number;
	second: number;
};

type ReducerState = {
	ts: Timestamp;
	milestone: Timestamp[];
};

type Unit = "h" | "m" | "s";

type ReducerAction =
	| {
			type: "increment_unit";
			payload: { by: number; unit: Unit };
	  }
	| {
			type: "set_unit";
			payload: { value: number; unit: Unit | "a" };
	  }
	| {
			type: "track_milestone";
	  };

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
	const newState = { ...state };
	switch (action.type) {
		case "increment_unit":
			const calculatedTs = calculateTimestamp(
				state.ts,
				action.payload.unit,
				action.payload.by
			);
			newState.ts = calculatedTs;
			return newState;
		case "set_unit":
			if (action.payload.unit === "a") {
				newState.ts = {
					hour: action.payload.value,
					minute: action.payload.value,
					second: action.payload.value,
				};
				newState.milestone = [];
			} else if (action.payload.unit === "h") {
				newState.ts.hour = action.payload.value;
			} else if (action.payload.unit === "m") {
				newState.ts.minute = action.payload.value;
			} else {
				newState.ts.second = action.payload.value;
			}
			return newState;
		case "track_milestone":
			newState.milestone.push({ ...newState.ts });
			return newState;
	}
}

function calculateTimestamp(ts: Timestamp, unit: Unit, by: number) {
	if (unit == "h") {
		ts.hour += by;
		ts.minute = 0;
		ts.second = 0;
	} else if (unit == "m") {
		let calculatedMinute = ts.minute + by;
		if (calculatedMinute >= 60) {
			ts.hour++;
			calculatedMinute = 0;
		}
		ts.minute = calculatedMinute;
	} else {
		let calculatedSecond = ts.second + by;
		if (calculatedSecond >= 60) {
			ts.minute++;
			calculatedSecond = 0;
		}
		if (ts.minute >= 60) {
			ts.minute = 0;
			ts.hour++;
		}
		ts.second = calculatedSecond;
	}
	return ts;
}

const StopWatch = () => {
	const [state, dispatch] = useReducer(reducer, {
		ts: {
			hour: 0,
			minute: 0,
			second: 0,
		},
		milestone: [],
	});
	const [started, setStarted] = useState(false);
	const intervalRef = useRef<number>(null);

	function onStartClick() {
		setStarted((prev) => !prev);
	}

	function resetClicked() {
		dispatch({
			type: "set_unit",
			payload: {
				unit: "a",
				value: 0,
			},
		});
	}
	function milestoneClicked() {
		dispatch({ type: "track_milestone" });
	}

	useEffect(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		if (started) {
			intervalRef.current = setInterval(() => {
				dispatch({
					type: "increment_unit",
					payload: {
						by: 1,
						unit: "s",
					},
				});
			}, 1000);
		}
	}, [started]);

	return (
		<div>
			<h2>Stop watch</h2>
			<div className="grid grid-cols-6 gap-2 max-w-[600px] border p-2 rounded-md">
				<div className="col-span-1 text-center px-2">
					<p>Hour(s)</p>
					<hr />
					<p>{state.ts.hour}</p>
				</div>
				<div className="col-span-1 text-center px-2">
					<p>Minute(s)</p>
					<hr />
					<p>{state.ts.minute}</p>
				</div>
				<div className="col-span-1 text-center px-2">
					<p>Second(s)</p>
					<hr />
					<p>{state.ts.second}</p>
				</div>
				<button onClick={onStartClick} className="btn my-auto">
					{started ? "Stop" : "Start"}
				</button>
				<button
					onClick={resetClicked}
					disabled={started}
					className="btn my-auto"
				>
					Reset
				</button>
				<button
					onClick={milestoneClicked}
					disabled={!started}
					className="btn my-auto"
				>
					Milestone
				</button>
				{state.milestone.length > 0 && (
					<div className="col-span-6">
						<h2>Milestones</h2>
						<hr />
						<div>
							{state.milestone.map((ts) => (
								<div>
									{ts.hour} H - {ts.minute} M - {ts.second}s
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default StopWatch;
