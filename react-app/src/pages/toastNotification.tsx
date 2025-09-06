import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { createContext, use, useState } from "react";

function genID() {
	return crypto.randomUUID();
}

const ToastNotification = () => {
	const [toastPosition, setToastPosition] = useState<ToastPosition>("topright");
	return (
		<div className="relative w-screen h-screen">
			<ToastProvider expiry={3500} position={toastPosition}>
				<h2>Toast Notification</h2>
				<div className="flex flex-col">
					<AddToastBtn />
					<label>Select Position</label>
					<select
						className="border w-fit"
						onChange={(e) => setToastPosition(e.target.value as ToastPosition)}
						value={toastPosition}
					>
						<option value="topleft">Top Left</option>
						<option value="topright">Top Right</option>
						<option value="bottomleft">Bottom Left</option>
						<option value="bottomright">Bottom Right</option>
					</select>
				</div>
			</ToastProvider>
		</div>
	);
};

function AddToastBtn() {
	const { addToast } = useToastContext();
	function onAddTodoClicked() {
		addToast("Hello world");
	}
	return (
		<button onClick={onAddTodoClicked} className="btn w-fit">
			Add Toast
		</button>
	);
}

type ToastPosition = "topleft" | "topright" | "bottomleft" | "bottomright";

type ToastProviderProps = {
	children?: React.ReactNode[] | React.ReactNode;
	position: ToastPosition;
	expiry: number;
};

const toastContext = createContext<{
	addToast(title: string, type?: ToastDisplayType): void;
	removeToast(id: string): void;
}>({} as any);

function useToastContext() {
	return use(toastContext);
}

type ToastDisplayType = "info" | "danger";

type ToastType = {
	id: string;
	title: string;
	type: ToastDisplayType;
};

function ToastProvider({ children, position, expiry }: ToastProviderProps) {
	const isTopLeft = position == "topleft";
	const isTopRight = position == "topright";
	const isBottomLeft = position == "bottomleft";
	const isBottomRight = position == "bottomright";
	const [toasts, setToasts] = useState<ToastType[]>([
		// { id: genID(), title: "sdsnldns", type: "info" },
		// { id: genID(), title: "dkf fa naf", type: "danger" },
	]);

	function addToast(title: string, type: ToastDisplayType) {
		const newToast = {
			id: genID(),
			title: title,
			type,
		};
		setToasts((p) => [newToast, ...p]);
		scheduleToastRemove(newToast.id, expiry);
	}

	function scheduleToastRemove(id: string, ms: number) {
		setTimeout(() => removeToast(id), ms);
	}

	function removeToast(id: string) {
		setToasts((p) => p.filter((x) => x.id !== id));
	}

	return (
		<>
			<toastContext.Provider value={{ addToast, removeToast }}>
				{children}
				{toasts.length > 0 && (
					<div
						className={`overflow-x-hidden
            ${isTopLeft && "top-0 left-0"} 
            ${isTopRight && "top-0 right-0"}
            ${isBottomLeft && "bottom-0 left-0"}
            ${isBottomRight && "bottom-0 right-0"}
            absolute w-[300px] flex flex-col gap-2 p-2`}
					>
						<AnimatePresence>
							{toasts.map((toast) => (
								<Toast key={toast.id} {...toast} />
							))}
						</AnimatePresence>
					</div>
				)}
			</toastContext.Provider>
		</>
	);
}

function Toast(props: ToastType) {
	const { removeToast } = useToastContext();

	return (
		<motion.div
			layout
			initial={{ opacity: 0, transform: "translateX(400px)" }}
			animate={{ opacity: 1, transform: "translateX(0px)" }}
			exit={{ opacity: 0, transform: "translateX(400px)" }}
			transition={{ duration: 0.3 }}
			className="border rounded-md shadow-md flex flex-col gap-1 bg-white"
		>
			<div
				className={`border-3 ${
					props.type == "danger" ? "border-red-400" : "border-blue-400"
				}`}
			></div>
			<div className="flex flex-row justify-between p-2">
				<p>{props.title}</p>
				<button onClick={() => removeToast(props.id)} className="btn h-fit">
					X
				</button>
			</div>
		</motion.div>
	);
}

export default ToastNotification;
