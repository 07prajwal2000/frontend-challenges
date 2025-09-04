import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import BarChart from "./pages/barChart";
import Index from "./pages";
import FolderStructure from "./pages/fileTree";
import ShapeHighlighter from "./pages/shapeHighlighter";
import Calculator from "./pages/calculator";
import Tabs from "./pages/tabs";
import Modal from "./pages/modal";
import ImageCarousel from "./pages/imageCarousel";
import Accordian from "./pages/accordian";
import SwitchPage from "./pages/switch";
import FormPage from "./pages/form";
import TypeAhead from "./pages/typeAhead";
import Otp from "./pages/otp";

const router = createBrowserRouter([
	{
		Component: Index,
		path: "/",
	},
	{
		Component: BarChart,
		path: "/bar-chart",
	},
	{
		Component: FolderStructure,
		path: "/file-tree",
	},
	{
		Component: ShapeHighlighter,
		path: "/shape-highlighter",
	},
	{
		Component: Calculator,
		path: "/calculator",
	},
	{
		Component: Tabs,
		path: "/tabs",
	},
	{
		Component: Modal,
		path: "/modal",
	},
	{
		Component: ImageCarousel,
		path: "/image-carousel",
	},
	{
		Component: Accordian,
		path: "/accordian",
	},
	{
		Component: SwitchPage,
		path: "/switch",
	},
	{
		Component: FormPage,
		path: "/forms",
	},
	{
		Component: TypeAhead,
		path: "/typeahead",
	},
	{
		Component: Otp,
		path: "/otp",
	},
]);

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
