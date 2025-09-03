import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import BarChart from "./pages/barChart";
import Index from "./pages";
import FolderStructure from "./pages/fileTree";
import ShapeHighlighter from "./pages/shapeHighlighter";
import Calculator from "./pages/calculator";

const router = createBrowserRouter([
	{
		Component: Index,
		path: "/spa/",
	},
	{
		Component: BarChart,
		path: "/spa/bar-chart",
	},
	{
		Component: FolderStructure,
		path: "/spa/file-tree",
	},
	{
		Component: ShapeHighlighter,
		path: "/spa/shape-highlighter",
	},
	{
		Component: Calculator,
		path: "/spa/calculator",
	},
]);

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
