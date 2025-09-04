import { motion } from "framer-motion";
import { useState } from "react";

const SwitchPage = () => {
	const [enabled, setEnabled] = useState(false);
	return (
		<div className="flex gap-4 flex-col">
			<div className="flex flex-row gap-2 items-center">
				<p>Interactive</p>
				<Switch enabled={enabled} onChange={setEnabled} />
			</div>

			<div className="flex flex-row gap-2 items-center">
				<p>Disabled</p>
				<Switch enabled={false} />
			</div>

			<div className="flex flex-row gap-2 items-center">
				<p>Enabled</p>
				<Switch enabled={true} />
			</div>
		</div>
	);
};

type SwitchProps = {
	enabled: boolean;
	onChange?: (value: boolean) => void;
};

function Switch({ enabled, onChange }: SwitchProps) {
	function toggle() {
		onChange?.(!enabled);
	}

	return (
		<div
			onClick={toggle}
			className={`w-[50px] h-[25px] px-0.5 flex items-center rounded-full cursor-pointer transition-colors ${
				enabled ? "bg-blue-500" : "bg-gray-300"
			}`}
		>
			<motion.div
				layout
				animate={{
					x: enabled ? 25 : 0,
				}}
				transition={{
					type: "spring",
					stiffness: 500,
					damping: 30,
				}}
				className="size-[20px] bg-white rounded-full shadow-md"
			/>
		</div>
	);
}

export default SwitchPage;
