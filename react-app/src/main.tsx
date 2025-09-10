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
import NestedComments from "./pages/nestedComments";
import Counter from "./pages/counter";
import GroupWords from "./pages/groupWords";
import Tictactoe from "./pages/tictactoe";
import TodoList from "./pages/todoList";
import StarRating from "./pages/starRating";
import ToastNotification from "./pages/toastNotification";
import ChipsInput from "./pages/chipsInput";
import DatePicker from "./pages/datePicker";
import StopWatch from "./pages/stopWatch";
import SevenSegment from "./pages/sevenSegment";
import TrafficLight from "./pages/trafficLight";
import TransferList from "./pages/transferList";
import PixelEditor from "./pages/pixelEditor";
import PasswordStrength from "./pages/passwordStrength";
import TelephoneFormatter from "./pages/telephoneFormatter";
import NestedCheckbox from "./pages/nestedCheckbox";

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
	{
		Component: NestedComments,
		path: "/nested-comments",
	},
	{
		Component: Counter,
		path: "/counter",
	},
	{
		Component: GroupWords,
		path: "/word-quiz",
	},
	{
		Component: Tictactoe,
		path: "/tictactoe",
	},
	{
		Component: TodoList,
		path: "/todo-list",
	},
	{
		Component: StarRating,
		path: "/star-rating",
	},
	{
		Component: ToastNotification,
		path: "/toast",
	},
	{
		Component: ChipsInput,
		path: "/chips-input",
	},
	{
		Component: DatePicker,
		path: "/date-picker",
	},
	{
		Component: StopWatch,
		path: "/stopwatch",
	},
	{
		Component: SevenSegment,
		path: "/seven-segment",
	},
	{
		Component: TrafficLight,
		path: "/traffic-light",
	},
	{
		Component: TransferList,
		path: "/transfer-list",
	},
	{
		Component: PixelEditor,
		path: "/pixel-editor",
	},
	{
		Component: PasswordStrength,
		path: "/passoword-strength",
	},
	{
		Component: TelephoneFormatter,
		path: "/telephone-formatter",
	},
	{
		Component: NestedCheckbox,
		path: "/nested-checkbox",
	},
]);

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
