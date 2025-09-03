const data = {
	chartData: [
		{
			value: 100,
			color: "red",
			label: "HR",
		},
		{
			value: 130,
			color: "green",
			label: "Tech",
		},
		{
			value: 50,
			color: "yellow",
			label: "Leadership",
		},
		{
			value: 35,
			color: "blue",
			label: "QA",
		},
		{
			value: 180,
			color: "violet",
			label: "Marketing",
		},
	],
};

const BarChart = () => {
	const { chartData } = data;
	const maxHeight = 350;
	const maxValue = chartData.reduce(
		(maxVal: number, val: any) => Math.max(maxVal, val.value),
		0
	);

	return (
		<div className="grid grid-cols-12">
			<div className="md:col-span-3 col-span-1"></div>
			<div
				style={{ height: `${maxHeight}px` }}
				className="md:col-span-6 col-span-10 border-b border-l ml-4 mt-4 relative"
			>
				<p className="absolute top-[50%] -left-3 -translate-y-[50%] -rotate-90 -translate-x-[50%]">
					Department Score
				</p>
				<ChartBars chartData={chartData} maxValue={maxValue + maxValue * 0.1} />
				<ChartLabels chartData={chartData} />
			</div>
		</div>
	);
};

function ChartLabels({ chartData }: { chartData: typeof data.chartData }) {
	return (
		<div className="flex flex-row gap-4 w-full px-2">
			{chartData.map((data: any) => (
				<div className="w-full text-center">{data.label}</div>
			))}
		</div>
	);
}

function ChartBars({
	chartData,
	maxValue,
}: {
	chartData: typeof data.chartData;
	maxValue: number;
}) {
	function getHeightPercent(value: number) {
		return Math.round((value / maxValue) * 100);
	}

	return (
		<div className="flex flex-row gap-4 items-end h-full w-full">
			{chartData.map((data: any) => (
				<div
					key={data.label}
					style={{
						height: `${getHeightPercent(data.value)}%`,
						backgroundColor: data.color,
					}}
					className="w-full text-center relative group"
				>
					<div className="absolute -top-8 bg-blue-200 group-hover:opacity-100 opacity-0 transition-[opacity] duration-[250ms] rounded-md text-center w-full">
						{data.value}
					</div>
				</div>
			))}
		</div>
	);
}

export default BarChart;
