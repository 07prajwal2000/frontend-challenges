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
			</ul>
		</div>
	);
};

export default Index;
