import { useReducer, useRef } from "react";

type StateType = {
	dimensions: {
		width: number;
		height: number;
	};
	options: {
		color: string;
	};
	grid: Array<Array<GridType>>;
};

type GridType = {
	fillColor: string;
	x: number;
	y: number;
};

type ActionType =
	| {
			type: "change_dimensions";
			payload: Pick<StateType, "dimensions">;
	  }
	| {
			type: "change_color";
			payload: string;
	  }
	| {
			type: "fill_grid";
			payload: GridType;
	  };

function reducer(state: StateType, action: ActionType): StateType {
	const newState = { ...state };
	switch (action.type) {
		case "change_dimensions":
			newState.dimensions = action.payload.dimensions;
			newState.grid = generateGrid(
				action.payload.dimensions.width,
				action.payload.dimensions.height
			);
			return newState;
		case "change_color":
			newState.options.color = action.payload;
			return newState;
		case "fill_grid":
			const { x, y, fillColor } = action.payload;
			newState.grid[y][x].fillColor = fillColor;
			return newState;
	}
}

function generateGrid(width: number, height: number) {
	const grid = Array<Array<GridType>>(height);
	for (let i = 0; i < height; i++) {
		grid[i] = Array(width);
		for (let j = 0; j < width; j++) {
			grid[i][j] = {
				fillColor: "",
				x: j,
				y: i,
			};
		}
	}
	return grid;
}

const PixelEditor = () => {
	const isMouseMoving = useRef<boolean>(null);
	const [state, disptch] = useReducer(reducer, {
		dimensions: {
			height: 10,
			width: 10,
		},
		options: {
			color: "#ffaa00",
		},
		grid: generateGrid(10, 10),
	});

	function clamp(value: number, min: number, max: number) {
		if (value > max) return max;
		else if (value < min) return min;
		return value;
	}

	function onDimensionChange(value: number, isHeight?: boolean) {
		value = Math.floor(value);
		value = clamp(value, 1, 100);
		disptch({
			type: "change_dimensions",
			payload: {
				dimensions: {
					height: isHeight ? value : state.dimensions.height,
					width: isHeight ? state.dimensions.width : value,
				},
			},
		});
	}

	function onColorChange(value: string) {
		disptch({
			type: "change_color",
			payload: value,
		});
	}

	function onCellClick(x: number, y: number) {
		disptch({
			type: "fill_grid",
			payload: {
				x,
				y,
				fillColor: state.options.color,
			},
		});
	}

	function onMouseDown() {
		isMouseMoving.current = true;
	}
	function onMouseExit() {
		isMouseMoving.current = false;
	}
	function onMouseEnter(x: number, y: number) {
		if (!isMouseMoving.current) return;
		onCellClick(x, y);
	}

	return (
		<div className="w-screen h-screen overflow-hidden">
			<div className="grid grid-cols-12 h-full w-full">
				<h2 className="text-2xl col-span-12 h-[5vh] font-semibold">
					Pixel Editor
				</h2>
				<div className="col-span-2 flex flex-col border p-2">
					<div className="grid grid-cols-2 gap-2">
						<h3 className="col-span-2">Dimensions</h3>
						<label>
							Width
							<input
								type="number"
								onChange={(e) => onDimensionChange(Number(e.target.value))}
								min={1}
								value={state.dimensions.width}
								max={100}
								className="input input-primary input-sm"
							/>
						</label>
						<label>
							Height
							<input
								type="number"
								min={1}
								onChange={(e) =>
									onDimensionChange(Number(e.target.value), true)
								}
								value={state.dimensions.height}
								max={100}
								className="input input-primary input-sm"
							/>
						</label>
					</div>
					<label>
						Color
						<input
							value={state.options.color}
							onChange={(e) => onColorChange(e.target.value)}
							type="color"
							className="input input-primary"
						/>
					</label>
				</div>
				<div className="col-span-10 border w-full h-[95vh] flex justify-center items-center">
					<table
						onMouseDown={onMouseDown}
						onMouseLeave={onMouseExit}
						onMouseUp={onMouseExit}
						className="overflow-y-auto border border-collapse"
					>
						{state.grid.map((_, i) => (
							<th key={i} />
						))}
						{state.grid.map((col, i) => (
							<tr key={i}>
								{col.map((cell, j) => (
									<td
										onMouseEnter={() => onMouseEnter(cell.x, cell.y)}
										style={{
											backgroundColor: cell.fillColor,
										}}
										onMouseDown={() => onCellClick(cell.x, cell.y)}
										key={j}
										className={`size-8 ${!cell.fillColor && "border"}`}
									></td>
								))}
							</tr>
						))}
					</table>
				</div>
			</div>
		</div>
	);
};

export default PixelEditor;
