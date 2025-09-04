import { motion } from "framer-motion";
import { useState } from "react";

const data = [
	{
		title: "ABCD",
		content: <>sdkjns ofanpi efpefenfpe</>,
	},
	{
		title: "1234 da lnfa feae ",
		content: (
			<>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam,
				corporis earum aut deserunt aliquam dolores, veritatis, nihil
				praesentium consectetur facere dolorum veniam laborum quasi corrupti. Ex
				aperiam aut eum!
			</>
		),
	},
	{
		title: "233c232c323d da lnfa feae ",
		content: (
			<div className="flex flex-col gap-4">
				<div>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
					aperiam, corporis earum aut deserunt aliquam dolores, veritatis, nihil
					praesentium consectetur facere dolorum veniam laborum quasi corrupti.
					Ex aperiam aut eum! Lorem ipsum dolor sit amet consectetur adipisicing
					elit. Praesentium vero provident maiores ducimus quis. Voluptatibus
					praesentium maxime laudantium quam earum officiis modi saepe
					blanditiis cum eum nostrum quia, vel dolorem?
				</div>
				<div>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto
					nostrum pariatur est quidem veniam molestiae porro rem nihil debitis
					adipisci dolore voluptatibus, libero impedit, enim laboriosam quod
					quibusdam tempore alias? Vero dolorem veniam aut, tempore cumque
					dolorum totam laborum facilis, repellat nemo at aliquid nostrum harum
					iure provident consectetur ratione qui, temporibus reprehenderit.
					Dolor doloribus sapiente dolorem? Quaerat, voluptates dignissimos?
				</div>
			</div>
		),
	},
	{
		title: "2333 da dssdecref cewlnfa feae ",
		content: (
			<>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore aperiam,
				corporis earum aut deserunt aliquam dolores, veritatis, nihil
				praesentium consectetur facere dolorum veniam laborum quasi corrupti. Ex
				aperiam aut eum!
			</>
		),
	},
];

const Accordian = () => {
	const [selected, setSelected] = useState(-1);

	return (
		<div className="max-w-[80vw] mx-auto mt-4">
			{data.map((item, i) => (
				<div key={item.title} className="mb-2 border border-sky-700">
					<div
						onClick={() => setSelected((p) => (i === p ? -1 : i))}
						className="text-xl p-2 transition-colors duration-200 hover:bg-sky-50 cursor-pointer flex flex-row justify-between"
					>
						<h3>{item.title}</h3>
						<span>{selected === i ? "-" : "+"}</span>
					</div>
					<motion.div
						initial={false}
						animate={{ height: selected === i ? "auto" : 0 }}
						transition={{ duration: 0.2 }}
						className="overflow-hidden"
					>
						<div className="p-4">{item.content}</div>
					</motion.div>
				</div>
			))}
		</div>
	);
};

export default Accordian;
