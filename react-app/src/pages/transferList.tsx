import { useState } from "react";

const TransferList = () => {
	const [lhs, setLhs] = useState<
		{
			value: string;
			selected: boolean;
		}[]
	>([
		{ value: "abc", selected: false },
		{ selected: false, value: "123" },
		{ selected: false, value: "dfdfdf" },
	]);
	const [rhs, setRhs] = useState<
		{
			value: string;
			selected: boolean;
		}[]
	>([]);
	const hasAnyLhsSelected =
		lhs.reduce((count, item) => (count += item.selected ? 1 : 0), 0) > 0;
	const hasAnyRhsSelected =
		rhs.reduce((count, item) => (count += item.selected ? 1 : 0), 0) > 0;

	function toggleSelection(index: number, isLhs: boolean, value?: boolean) {
		const itemsList = isLhs ? [...lhs] : [...rhs];
		const setter = isLhs ? setLhs : setRhs;
		itemsList[index].selected =
			value !== undefined ? value : !itemsList[index].selected;
		setter(itemsList);
	}

	function onCheckboxChange(i: number, value: boolean, list: "lhs" | "rhs") {
		toggleSelection(i, list == "lhs", value);
	}
	function moveToRhs(all?: boolean) {
		if (all == true) {
			setRhs((p) => [...p, ...lhs]);
			setLhs([]);
			return;
		}
		const newRhs = [...rhs];
		for (let item of lhs) {
			if (!item.selected) continue;
			newRhs.push({ ...item, selected: false });
		}
		setLhs(lhs.filter((item) => !item.selected));
		setRhs(newRhs);
	}
	function moveToLhs(all?: boolean) {
		if (all == true) {
			setLhs((p) => [...p, ...rhs]);
			setRhs([]);
			return;
		}
		const newLhs = [...lhs];
		for (let item of rhs) {
			if (!item.selected) continue;
			newLhs.push({ ...item, selected: false });
		}
		setLhs(newLhs);
		setRhs(rhs.filter((item) => !item.selected));
	}

	return (
		<div>
			<h2>TransferList</h2>
			<div className="p-4 grid grid-cols-5 gap-2 w-[500px] h-[50vh] text-center">
				<div className="col-span-2 border overflow-y-hidden">
					<h3>LHS</h3>
					<hr />
					<RenderCheckboxes
						list={lhs}
						onCheckboxChange={onCheckboxChange}
						whichList="lhs"
					/>
				</div>
				<div className="col-span-1 border items-center justify-center flex flex-col gap-3">
					<button
						onClick={() => moveToLhs(true)}
						disabled={rhs.length == 0}
						className="btn w-fit"
					>
						{"<<"}
					</button>
					<button
						onClick={() => moveToLhs()}
						disabled={!hasAnyRhsSelected}
						className="btn w-fit"
					>
						{"<"}
					</button>
					<button
						onClick={() => moveToRhs()}
						disabled={!hasAnyLhsSelected}
						className="btn w-fit"
					>
						{">"}
					</button>
					<button
						onClick={() => moveToRhs(true)}
						disabled={lhs.length == 0}
						className="btn w-fit"
					>
						{">>"}
					</button>
				</div>
				<div className="col-span-2 border overflow-y-hidden">
					<h3>RHS</h3>
					<hr />
					<RenderCheckboxes
						list={rhs}
						onCheckboxChange={onCheckboxChange}
						whichList="rhs"
					/>
				</div>
			</div>
		</div>
	);
};

function RenderCheckboxes(props: {
	list: {
		value: string;
		selected: boolean;
	}[];
	whichList: "lhs" | "rhs";
	onCheckboxChange: (i: number, value: boolean, list: "lhs" | "rhs") => void;
}) {
	function onCheckboxChanged(i: number, checked: boolean) {
		props.onCheckboxChange(i, checked, props.whichList);
	}

	return (
		<div className="w-full">
			{props.list.map((x, i) => (
				<label className="flex flex-row gap-2">
					<input
						onChange={(e) => onCheckboxChanged(i, e.target.checked)}
						type="checkbox"
						name={x.value}
						id={x.value}
						checked={x.selected}
					/>
					{x.value}
				</label>
			))}
		</div>
	);
}

export default TransferList;
