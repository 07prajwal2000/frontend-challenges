// https://www.youtube.com/watch?v=DCoIeGt4g7M

import { useEffect, useState } from "react";

const shape = [
	[1, 1, 0],
	[1, 1, 0],
	[1, 0, 1],
];

function sleep(ms: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const ShapeHighlighter = () => {
	const [grid, setGrid] = useState(shape);
	const [disabled, setDisabled] = useState(false);
	const totalBlocked = grid.reduce((count, arr) => {
		arr.forEach((num) => {
			if (num == 1) count++;
		});
		return count;
	}, 0);
	const [queue, setQueue] = useState<number[][]>([]);

	function addToQueue(i: number, j: number) {
		if (grid[i][j] == 2) return;
		setQueue((p) => [...p, [i, j]]);
		setGrid((p) => {
			const newGrid = [...p];
			newGrid[i][j] = 2;
			return newGrid;
		});
	}

	useEffect(() => {
		if (totalBlocked == 0) {
			removeFromQueue();
		}
	}, [totalBlocked]);

	async function removeFromQueue() {
		setDisabled(true);
		while (queue.length) {
			await sleep(500);
			const [i, j] = queue.shift()!;
			setGrid((p) => {
				const oldGrid = [...p];
				oldGrid[i][j] = 1;
				return oldGrid;
			});
		}
		setQueue([]);
		setDisabled(false);
	}

	return (
		<div className="flex flex-col gap-1">
			{grid.map((rows, i) => (
				<div key={i} className="flex flex-row gap-1">
					{rows.map((num, j) => (
						<Cell
							disabled={disabled}
							addToQueue={addToQueue}
							coords={{ i, j }}
							num={num}
							key={`${i}-${j}`}
						/>
					))}
				</div>
			))}
		</div>
	);
};

function Cell({
	num,
	coords,
	addToQueue,
	disabled,
}: {
	num: number;
	coords: { i: number; j: number };
	addToQueue: (i: number, j: number) => void;
	disabled: boolean;
}) {
	function onCellClick() {
		if (num !== 1 || disabled) return;
		addToQueue(coords.i, coords.j);
	}
	return (
		<div
			onClick={onCellClick}
			className={`size-14 transition-[background-color] duration-300 ${
				num && "border cursor-pointer"
			} ${num == 2 ? "bg-green-400" : "bg-white"}`}
		></div>
	);
}

export default ShapeHighlighter;
