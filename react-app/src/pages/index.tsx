import { Link } from "react-router";

const Index = () => {
	return (
		<div>
			<h2 className="text-3xl">Home page</h2>
			<ul className="list-disc px-8">
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/bar-chart"}>
						Bar chart
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/file-tree"}>
						File tree
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/shape-highlighter"}
					>
						Shape Highlighter
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/calculator"}>
						Calculator
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/tabs"}>
						Tabs
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/modal"}>
						Modal
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/image-carousel"}
					>
						Image Carousel
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/accordian"}>
						Accordian
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/switch"}>
						Switch
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/forms"}>
						Forms
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/typeahead"}>
						Type ahead
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/otp"}>
						OTP
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/nested-comments"}
					>
						Nested Comments
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/counter"}>
						Counter
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/word-quiz"}>
						Word Quiz
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/tictactoe"}>
						Tic Tac Toe
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/todo-list"}>
						Todo List
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/star-rating"}>
						Star Rating
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/toast"}>
						Toast Notification
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/chips-input"}>
						Chips Input
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/date-picker"}>
						Date picker
					</Link>
				</li>
				<li>
					<Link className="underline text-blue-700 text-xl" to={"/stopwatch"}>
						Stopwatch
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/seven-segment"}
					>
						7 Segment Clock
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/traffic-light"}
					>
						Traffic Light
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/transfer-list"}
					>
						Transfer List
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/pixel-editor"}
					>
						Pixel Editor
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/passoword-strength"}
					>
						Password Strength
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/telephone-formatter"}
					>
						Telephone Formatter
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Index;
