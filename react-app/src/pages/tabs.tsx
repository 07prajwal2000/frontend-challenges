import { useState } from "react";

const tabsContent = [
	{
		title: "Dashboard",
		children: (
			<>
				<h2 className="text-2xl">Dashboard</h2>
			</>
		),
	},
	{
		title: "Settings",
		children: (
			<>
				<h2 className="text-2xl">Settings</h2>
			</>
		),
	},
	{
		title: "Profile",
		children: (
			<>
				<h2 className="text-2xl">Profile</h2>
			</>
		),
	},
	{
		title: "Scripts",
		children: (
			<>
				<h2 className="text-2xl">Scripts</h2>
			</>
		),
	},
];

const Tabs = () => {
	const [selectedTab, setSelectedTab] = useState(tabsContent[0]);

	function onTabClick(title: string) {
		const foundTab = tabsContent.find((tab) => tab.title == title);
		if (!foundTab) return;
		setSelectedTab(foundTab);
	}

	return (
		<div>
			<div className="flex flex-row my-1 mx-2 gap-1 items-center">
				{tabsContent.map((tab) => (
					<Tab
						key={tab.title}
						title={tab.title}
						onTabClick={onTabClick}
						isSelected={tab.title == selectedTab.title}
					/>
				))}
			</div>
			<hr />
			<div className="mx-2">{selectedTab.children}</div>
		</div>
	);
};

function Tab(props: {
	title: string;
	isSelected: boolean;
	onTabClick: (title: string) => void;
}) {
	return (
		<div
			onClick={() => props.onTabClick(props.title)}
			className={`border-2 ${
				props.isSelected
					? "border-blue-700 bg-blue-500 text-white "
					: "hover:bg-blue-50"
			} p-2 rounded-md cursor-pointer`}
		>
			{props.title}
		</div>
	);
}

export default Tabs;
