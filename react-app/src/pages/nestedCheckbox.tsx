import { useState } from "react";

type CheckboxesList = {
	id: number;
	label: string;
	children?: CheckboxesList[];
};

const checkboxesList: CheckboxesList[] = [
	{
		id: 1,
		label: "Vegetables",
		children: [],
	},
	{
		id: 2,
		label: "Fruits",
		children: [
			{
				id: 3,
				label: "Moosambi",
			},
			{
				id: 4,
				label: "Orange",
			},
			{
				id: 5,
				label: "Sweet",
				children: [
					{
						id: 6,
						label: "Banana",
					},
					{
						id: 7,
						label: "Apple",
					},
				],
			},
		],
	},
	{
		id: 8,
		label: "Mango",
		children: [
			{
				id: 9,
				label: "Mango 2",
			},
		],
	},
	{
		id: 10,
		label: "Apple",
	},
];

const NestedCheckbox = () => {
	const [checkboxData, setCheckboxData] = useState<Record<string, boolean>>({});

	function onCheckboxToggle(id: number, value: boolean) {
		setCheckboxData((prev) => {
			let newData = { ...prev };
			const childList = getChildren(id);
			newData[id] = value;
			childList.forEach((x) => {
				newData[x] = value;
			});
			for (let cb of checkboxesList) {
				if (cb.children == undefined || cb.children.length == 0) continue;
				const [parentsList, _] = getParentsValue(cb, newData);
				newData = { ...newData, ...parentsList };
			}
			return newData;
		});
	}

	function getChildren(
		id: number,
		searchSpace = checkboxesList,
		childrenList = [] as number[]
	) {
		let foundCheckbox: CheckboxesList | null = null;
		for (const checkbox of searchSpace) {
			if (checkbox.children == undefined) continue;
			if (checkbox.id == id) {
				foundCheckbox = checkbox;
				break;
			}
			getChildren(id, checkbox.children, childrenList);
		}
		if (foundCheckbox == null) return childrenList;
		const stack = [foundCheckbox];
		while (stack.length > 0) {
			const checkbox = stack.pop()!;
			childrenList.push(checkbox.id);
			checkbox.children?.forEach((x) => stack.push(x));
		}
		return childrenList;
	}
	function getParentsValue(
		checkbox: CheckboxesList,
		newCheckboxData = checkboxData,
		parentsList = {} as Record<string, boolean>
	): [Record<string, boolean>, number] {
		const searchSpace = checkbox.children!;
		let checkedCount = 0;
		for (const cb of searchSpace) {
			if (!cb.children && newCheckboxData[cb.id] === true) checkedCount++;
			if (cb.children?.length ?? 0 > 0) {
				const [_, count] = getParentsValue(cb, newCheckboxData, parentsList);
				if (count === cb.children!.length) checkedCount++;
			}
		}
		parentsList[checkbox.id] = checkedCount >= searchSpace.length;
		return [parentsList, checkedCount];
	}

	return (
		<div>
			<h2 className="text-2xl">Nexted Checkbox</h2>
			<hr />
			<div className="p-4">
				<CheckBoxList
					onCheckboxToggle={onCheckboxToggle}
					checkboxes={checkboxesList}
					checkboxData={checkboxData}
				/>
			</div>
		</div>
	);
};

function CheckBoxList(props: {
	checkboxes?: CheckboxesList[];
	checkboxData: Record<string, boolean>;
	onCheckboxToggle(id: number, value: boolean): void;
}) {
	if (!props.checkboxes) return <></>;
	return (
		<div className="pl-4">
			{props.checkboxes.map((checkbox) => (
				<div key={checkbox.id}>
					<div className="flex flex-row gap-2">
						<input
							checked={props.checkboxData[checkbox.id] ?? false}
							type="checkbox"
							className=""
							onChange={(e) =>
								props.onCheckboxToggle(checkbox.id, e.target.checked)
							}
							id={checkbox.id.toString()}
						/>
						<label htmlFor={checkbox.id.toString()}>{checkbox.label}</label>
					</div>
					<CheckBoxList
						onCheckboxToggle={props.onCheckboxToggle}
						checkboxes={checkbox.children}
						checkboxData={props.checkboxData}
					/>
				</div>
			))}
		</div>
	);
}

export default NestedCheckbox;
