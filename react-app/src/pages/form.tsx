import { motion } from "framer-motion";
import { useId } from "react";

enum ElementType {
	str = "str",
	num = "num",
	grid12 = "grid12",
	grid6 = "grid6",
}

const formElements = [
	{
		id: crypto.randomUUID(),
		label: "",
		type: ElementType.grid6,
	},
	{
		id: crypto.randomUUID(),
		label: "Name",
		type: ElementType.str,
	},
	{
		id: crypto.randomUUID(),
		label: "Age",
		type: ElementType.num,
	},
	{
		id: crypto.randomUUID(),
		label: "",
		type: ElementType.grid12,
	},
	{
		id: crypto.randomUUID(),
		label: "Email",
		type: ElementType.str,
	},
	{
		id: crypto.randomUUID(),
		label: "Confirm Email",
		type: ElementType.str,
	},
	{
		id: crypto.randomUUID(),
		label: "",
		type: ElementType.grid6,
	},
	{
		id: crypto.randomUUID(),
		label: "Address",
		type: ElementType.str,
	},
];

const FormPage = () => {
	function convertForRender() {
		const parents: ((typeof formElements)[0] & {
			children: typeof formElements;
		})[] = [];

		for (let element of formElements) {
			if (
				element.type == ElementType.grid12 ||
				element.type == ElementType.grid6
			) {
				parents.push({ ...element, children: [] });
			} else {
				parents[parents.length - 1].children.push(element);
			}
		}
		return parents;
	}

	return (
		<div className="max-w-[80vw] mx-auto">
			{convertForRender().map((element) =>
				element.type == ElementType.grid12 ? (
					<Grid12 key={element.id} element={element} />
				) : (
					<Grid6 key={element.id} element={element} />
				)
			)}
		</div>
	);
};

type GridProps = {
	id: string;
	label: string;
	children: {
		id: string;
		label: string;
		type: ElementType;
	}[];
};

function Grid6({ element }: { element: GridProps }) {
	return (
		<div className="grid grid-cols-2 gap-2">
			{element.children.map((el) => (
				<StrInputElement key={el.id} label={el.label} />
			))}
		</div>
	);
}

function StrInputElement({ label }: { label: string }) {
	const id = useId();
	return (
		<div className="flex flex-col">
			<label htmlFor={id}>{label}</label>
			<motion.input
				type="text"
				id={id}
				animate={{
					outlineWidth: 0,
				}}
				whileFocus={{
					outlineWidth: "3px",
				}}
				transition={{
					duration: 0.1,
				}}
				className="border-2 border-indigo-500 focus:outline-3 focus:outline-indigo-300 text-lg p-1 rounded-md px-2"
			/>
		</div>
	);
}

function Grid12({ element }: { element: GridProps }) {
	return (
		<div className="grid grid-cols-1">
			{element.children.map((el) => (
				<StrInputElement key={el.id} label={el.label} />
			))}
		</div>
	);
}

export default FormPage;
