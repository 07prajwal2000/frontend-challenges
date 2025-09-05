import { useEffect, useState } from "react";
import "../defaults.css";

enum PLAYER {
	NONE = 0,
	P1 = 1,
	P2 = 2,
}
enum GAME_STATUS {
	PLAYING = 0,
	P1_WON = 1,
	P2_WON = 2,
	DRAW = 3,
}

function buildBoard(size = 3) {
	const board = Array<Array<PLAYER>>(size);
	for (let i = 0; i < size; i++) {
		board[i] = Array(size).fill(PLAYER.NONE);
	}
	return board;
}

function calculateWinner(
	board: PLAYER[][],
	curPos: { x: number; y: number; owner: PLAYER }
) {
	const n = board.length;
	const { x, y, owner } = curPos;
	// 1st row, 2nd col, 3st left->right, 4nd right->left
	const ownedCount = [0, 0, 0, 0];
	for (let i = 0; i < n; i++) {
		const rowCell = board[x][i];
		const colCell = board[i][y];
		if (rowCell === owner) ownedCount[0]++;
		if (colCell === owner) ownedCount[1]++;
		const lrCell = board[i][i],
			rlCell = board[i][n - i - 1];
		if (lrCell === owner) ownedCount[2]++;
		if (rlCell === owner) ownedCount[3]++;
	}
	return ownedCount.some((count) => count == n);
}

const Tictactoe = () => {
	const [boardSize, setBoardSize] = useState(3);
	const [board, setBoard] = useState(buildBoard(boardSize));
	const [currentPlayer, setCurrentPlayer] = useState(PLAYER.P1);
	const [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);
	const [totalMoves, setTotalMoves] = useState(0);

	useEffect(() => {
		if (
			totalMoves === boardSize * boardSize &&
			gameStatus === GAME_STATUS.PLAYING
		) {
			setGameStatus(GAME_STATUS.DRAW);
		}
	}, [totalMoves]);

	function onCellClick(i: number, j: number) {
		if (gameStatus !== GAME_STATUS.PLAYING) return;
		if (board[i][j] != PLAYER.NONE) return;
		const newBoard = [...board];
		newBoard[i][j] = currentPlayer;
		setBoard(newBoard);
		setCurrentPlayer((p) => (p == PLAYER.P1 ? PLAYER.P2 : PLAYER.P1));
		const isWinner = calculateWinner(newBoard, {
			owner: currentPlayer,
			x: i,
			y: j,
		});
		if (isWinner) {
			setGameStatus(
				currentPlayer == PLAYER.P1 ? GAME_STATUS.P1_WON : GAME_STATUS.P2_WON
			);
		}
		setTotalMoves((p) => p + 1);
	}

	function resetBoard(newSize?: number) {
		setBoard(buildBoard(newSize || boardSize));
		setGameStatus(GAME_STATUS.PLAYING);
		setTotalMoves(0);
	}
	function onBoardSizeChange(newSize: number) {
		setBoardSize(newSize);
		resetBoard(newSize);
	}

	return (
		<div className="flex flex-row gap-8">
			<div className="flex flex-col gap-2 ">
				{gameStatus == GAME_STATUS.PLAYING && <h2>Status: PLAYING</h2>}
				{gameStatus == GAME_STATUS.P1_WON && <h2>Status: P1 WON</h2>}
				{gameStatus == GAME_STATUS.P2_WON && <h2>Status: P2 WON</h2>}
				{gameStatus == GAME_STATUS.DRAW && <h2>Status: DRAW</h2>}
				<hr />
				<button className="btn" onClick={() => resetBoard()}>
					Reset Board
				</button>
				<label className="flex flex-row justify-center gap-2">
					Board Size
					<input
						type="range"
						min={3}
						max={6}
						value={boardSize}
						onChange={(e) => onBoardSizeChange(parseInt(e.target.value))}
					/>
				</label>
				<div className="flex flex-row items-center gap-3">
					<p>Current Player: </p> {currentPlayer == PLAYER.P1 ? "P1" : "P2"}
					<div
						className={`size-4 ${
							currentPlayer == PLAYER.P1 ? "bg-violet-600" : "bg-green-600"
						}`}
					></div>{" "}
				</div>
			</div>
			<div className="flex flex-col gap-2">
				{board.map((row, i) => (
					<div key={i} className="flex flex-row gap-2">
						{row.map((cell, j) => (
							<BoardCell
								owner={cell}
								i={i}
								j={j}
								key={`${i}-${j}`}
								onClick={onCellClick}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

function BoardCell({
	owner,
	i,
	j,
	onClick,
}: {
	onClick?: (i: number, j: number) => void;
	i: number;
	j: number;
	owner: PLAYER;
}) {
	const isP1Owned = owner == PLAYER.P1;
	const isUnOwned = owner == PLAYER.NONE;
	return (
		<div
			onClick={() => onClick?.(i, j)}
			className={`size-12 border cursor-pointer ${
				!isUnOwned
					? isP1Owned
						? "bg-violet-600"
						: "bg-green-600"
					: "hover:bg-yellow-50"
			}`}
		/>
	);
}

export default Tictactoe;
