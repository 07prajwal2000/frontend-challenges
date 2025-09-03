import { Link } from "react-router";

const Index = () => {
	return (
		<div>
			<h2 className="text-3xl">Home page</h2>
			<ul className="list-disc px-8">
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/spa/bar-chart"}
					>
						Bar chart
					</Link>
				</li>
				<li>
					<Link
						className="underline text-blue-700 text-xl"
						to={"/spa/file-tree"}
					>
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
					<Link
						className="underline text-blue-700 text-xl"
						to={"/spa/calculator"}
					>
						Calculator
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Index;
