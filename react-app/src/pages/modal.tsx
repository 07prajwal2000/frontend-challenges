import type React from "react";
import { useRef, useState } from "react";

const Modal = () => {
	const [opened, setOpened] = useState(false);

	function toggleModal() {
		setOpened((p) => !p);
	}

	return (
		<div>
			<button
				className="border border-blue-800 focus:outline-2 focus:outline-blue-400 cursor-pointer p-2 m-2 rounded-md bg-blue-600 text-white"
				onClick={toggleModal}
			>
				Open Modal
			</button>
			<Dialog
				onClose={toggleModal}
				opened={opened}
				title={"Hello Title"}
			></Dialog>
		</div>
	);
};

type DialogProps = {
	opened: boolean;
	title?: React.ReactNode;
	children?: React.ReactNode;
	onClose?: () => void;
};

function Dialog(props: DialogProps) {
	if (!props.opened) return <></>;
	const backdropRef = useRef<HTMLDivElement>(null);

	function onBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
		if (e.target == backdropRef.current) {
			props.onClose?.();
		}
	}

	return (
		<div
			className="absolute top-0 left-0 flex justify-center items-center right-0 bottom-0 max-w-screen max-h-screen overflow-hidden -z-[2]"
			onClick={onBackdropClick}
		>
			<div
				ref={backdropRef}
				className="bg-gray-400 absolute opacity-60 -z-[1] h-full w-full"
			/>
			<div className="bg-white min-w-[30%] rounded-md min-h-[20%] p-2 flex flex-col gap-1">
				<div className="flex flex-row gap-2 justify-between items-center">
					<h1 className="text-2xl font-bold">{props.title || "Title"}</h1>
					<button
						onClick={props.onClose}
						className="border px-3 py-1 rounded-md"
					>
						X
					</button>
				</div>
				<hr />
				<div>{props.children}</div>
			</div>
		</div>
	);
}

export default Modal;
