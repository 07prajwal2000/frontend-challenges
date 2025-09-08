import { useEffect, useState } from "react";

const SevenSegment = () => {
	const [curDate, setCurDate] = useState(new Date());
	const [is12HrFormat, setIs12HrFormat] = useState(true);
	const hour = curDate.getHours() - (is12HrFormat ? 12 : 0);
	const minutes = curDate.getMinutes();
	const seconds = curDate.getSeconds();

	useEffect(() => {
		setInterval(() => {
			setCurDate(new Date());
		}, 1000);
	}, []);

	return (
		<div>
			<h2>7 Segment Clock</h2>
			<div className="p-4 flex flex-row gap-3">
				<SegmentCell value={Math.floor(hour / 10)} />
				<SegmentCell value={hour % 10} />
				<p className="w-fit text-5xl">:</p>
				<SegmentCell value={Math.floor(minutes / 10)} />
				<SegmentCell value={minutes % 10} />
				<p className="w-fit text-5xl">:</p>
				<SegmentCell value={Math.floor(seconds / 10)} />
				<SegmentCell value={seconds % 10} />
			</div>
		</div>
	);
};

function SegmentCell(props: { value: number }) {
	const segmentArray = getSegmentArray(props.value);
	return (
		<div className="w-10 h-16 flex flex-col">
			{/* 1 */}
			<div
				className={`w-full mx-auto h-2 ${
					segmentArray.includes(1) && "bg-black"
				}`}
			/>
			{/* 2 3 */}
			<div className="flex flex-row justify-between w-full">
				<div className={`w-1 h-6 ${segmentArray.includes(2) && "bg-black"}`} />
				<div className={`w-1 h-6 ${segmentArray.includes(3) && "bg-black"}`} />
			</div>
			{/* 4 */}
			<div
				className={`w-full mx-auto h-2 ${
					segmentArray.includes(4) && "bg-black"
				}`}
			/>
			{/* 5  6 */}
			<div className="flex flex-row justify-between w-full">
				<div className={`w-1 h-6 ${segmentArray.includes(5) && "bg-black"}`} />
				<div className={`w-1 h-6 ${segmentArray.includes(6) && "bg-black"}`} />
			</div>
			{/* 7 */}
			<div
				className={`w-full mx-auto h-2 ${
					segmentArray.includes(7) && "bg-black"
				}`}
			/>
		</div>
	);
}

function getSegmentArray(number: number) {
	if (number == 0) return [1, 2, 3, 5, 6, 7];
	else if (number == 1) return [3, 6];
	else if (number == 2) return [1, 3, 4, 5, 7];
	else if (number == 3) return [1, 3, 4, 6, 7];
	else if (number == 4) return [2, 3, 4, 6];
	else if (number == 5) return [1, 2, 4, 6, 7];
	else if (number == 6) return [1, 2, 4, 5, 6, 7];
	else if (number == 7) return [1, 3, 6];
	else if (number == 8) return [1, 2, 3, 4, 5, 6, 7];
	else if (number == 9) return [1, 2, 3, 4, 6];
	else return [];
}

/*
 _    1
| |  2  3
 _    4
| |  5  6
 _    7
*/

export default SevenSegment;
