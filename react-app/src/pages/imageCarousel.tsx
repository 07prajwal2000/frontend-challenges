import { useEffect, useRef, useState } from "react";

const images = [
	{ src: "https://picsum.photos/id/600/600/400", alt: "Forest" },
	{ src: "https://picsum.photos/id/100/600/400", alt: "Beach" },
	{ src: "https://picsum.photos/id/200/600/400", alt: "Yak" },
	{ src: "https://picsum.photos/id/300/600/400", alt: "Hay" },
	{ src: "https://picsum.photos/id/400/600/400", alt: "Plants" },
	{ src: "https://picsum.photos/id/500/600/400", alt: "Building" },
];

const ImageCarousel = () => {
	const [index, setIndex] = useState(0);
	const [autoScroll, setAutoScroll] = useState(true);
	const slideWidth = 450;
	const intervalIdRef = useRef<number>(null);

	function moveCarousel(direction: "left" | "right") {
		setIndex((prev) => {
			let next = direction === "left" ? prev - 1 : prev + 1;
			if (next < 0) next = images.length - 1;
			if (next >= images.length) next = 0;
			return next;
		});
	}

	function toggleAutoScroll() {
		setAutoScroll((p) => !p);
	}

	useEffect(() => {
		if (!autoScroll) {
			clearInterval(intervalIdRef.current!);
			return;
		}
		intervalIdRef.current = setInterval(() => {
			moveCarousel("right");
		}, 2500);
	}, [autoScroll]);

	return (
		<div>
			<div className="pb-8">
				<h3 className="text-xl">Settings</h3>
				<hr />
				<label>
					<input
						type="checkbox"
						checked={autoScroll}
						onChange={toggleAutoScroll}
					/>
					Auto Scroll
				</label>
			</div>
			<div className="flex flex-row justify-center items-center relative">
				<div
					onClick={() => moveCarousel("left")}
					className="cursor-pointer z-10 translate-x-10 text-white border size-8 rounded-full text-center bg-black"
				>
					{"<"}
				</div>

				<div className="w-[450px] overflow-hidden">
					<div
						className="flex transition-transform duration-300"
						style={{
							transform: `translateX(-${index * slideWidth}px)`,
						}}
					>
						{images.map((image) => (
							<img
								key={image.src}
								src={image.src}
								alt={image.alt}
								style={{ flex: "0 0 450px" }}
							/>
						))}
					</div>
				</div>

				<div
					onClick={() => moveCarousel("right")}
					className="cursor-pointer z-10 -translate-x-10 text-white border size-8 rounded-full text-center bg-black"
				>
					{">"}
				</div>
				<div className="absolute -bottom-6 flex flex-row gap-2">
					{images.map((image, i) => (
						<div
							onClick={() => setIndex(i)}
							key={image.alt}
							className={`size-3 rounded-full cursor-pointer mb-2 ${
								i == index ? "bg-green-500" : "bg-green-200"
							} border-2 border-green-800`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImageCarousel;
