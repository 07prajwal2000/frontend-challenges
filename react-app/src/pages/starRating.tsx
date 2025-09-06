import React, { useState } from "react";

const StarRating = () => {
	const [starsCount, setStarsCount] = useState(5);
	const [highlightedStars, setHighlightedStars] = useState(0);
	const [selectedStars, setSelectedStars] = useState(0);

	function onHover(index: number) {
		setHighlightedStars(index);
	}
	function onClick(index: number) {
		setSelectedStars(index);
	}
	function onMouseExit() {
		setHighlightedStars(0);
	}
	function generateStars(count = 5) {
		const stars: React.ReactNode[] = [];
		for (let i = 0; i < count; i++) {
			const isFilled =
				highlightedStars !== 0 ? highlightedStars > i : selectedStars > i;
			stars.push(
				<Star
					key={i}
					onClick={onClick}
					index={i + 1}
					onHover={onHover}
					filled={isFilled}
				/>
			);
		}
		return stars;
	}
	function clearSelected() {
		setSelectedStars(0);
		setHighlightedStars(0);
	}
	function onStarsChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.target.value);
		if (isNaN(value)) return;
		setStarsCount(value);
		setSelectedStars((p) => Math.min(value, p));
		setHighlightedStars((p) => Math.min(value, p));
	}

	return (
		<div className="p-2 border w-fit" onMouseLeave={onMouseExit}>
			<input
				value={starsCount}
				onChange={onStarsChange}
				type="range"
				min={3}
				max={10}
			/>
			<div className="flex flex-row gap-4 p-2">
				{generateStars(starsCount)}
				<button className="ml-4 border px-2 rounded-md" onClick={clearSelected}>
					Clear
				</button>
			</div>
		</div>
	);
};

function Star({
	filled,
	onHover,
	onClick,
	index,
}: {
	index: number;
	filled?: boolean;
	onHover: (i: number) => void;
	onClick: (i: number) => void;
}) {
	return (
		<div
			onClick={() => onClick(index)}
			onMouseEnter={() => onHover(index)}
			className={`size-6 ${filled && "bg-amber-400"} border border-amber-700`}
		/>
	);
}

export default StarRating;
