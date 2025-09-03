import { createContext, use, useState } from "react";

type FolderStructureType = {
	id: string;
	name: string;
	children?: FolderStructureType[];
};

const FOLDER_DATA: FolderStructureType[] = [
	{
		id: crypto.randomUUID(),
		name: "Source",
		children: [
			{
				id: crypto.randomUUID(),
				name: "index.js",
			},
			{
				id: crypto.randomUUID(),
				name: "route.js",
			},
			{
				id: crypto.randomUUID(),
				name: "migrate.js",
			},
			{
				id: crypto.randomUUID(),
				name: "migrations",
				children: [
					{
						id: crypto.randomUUID(),
						name: "index.js",
					},
					{
						name: "seed.js",
						id: crypto.randomUUID(),
					},
					{
						id: crypto.randomUUID(),
						name: "bootstrap.sql",
					},
				],
			},
		],
	},
	{
		id: crypto.randomUUID(),
		name: "Docs",
		children: [
			{
				id: crypto.randomUUID(),
				name: "index.md",
			},
			{
				id: crypto.randomUUID(),
				name: "concepts.md",
			},
		],
	},
	{
		id: crypto.randomUUID(),
		name: "Readme.md",
	},
];

const folderContext = createContext<{
	addFile: (parent: string) => void;
	deleteNode: (parent: string) => void;
}>({} as any);

const FolderStructure = () => {
	const [filesFolders, setFilesFolders] = useState(FOLDER_DATA);

	function addFile(parent: string) {
		const newFilename = prompt("Please enter the file name");
		if (!newFilename?.trim()) return;
		const newFilesFolder = [...filesFolders];

		const foundFolder = searchHelper(newFilesFolder, parent);
		if (!foundFolder) return;
		foundFolder.file?.children?.push({
			id: crypto.randomUUID(),
			name: newFilename!,
			children: newFilename.indexOf(".") == -1 ? [] : undefined,
		});
		setFilesFolders(newFilesFolder);
	}

	function searchHelper(
		folders: FolderStructureType[],
		parentId: string
	): {
		file: FolderStructureType;
		parent: FolderStructureType[] | null;
	} | null {
		for (let file of folders) {
			const isFolder = file.children && file.children.length > 0;
			if (file.id == parentId) {
				return { file, parent: folders };
			}
			if (!isFolder) continue;
			const result = searchHelper(file.children!, parentId);
			if (result) {
				return result;
			}
		}
		return null;
	}

	function deleteNode(parent: string) {
		const confirmed = confirm("Are you sure want to delete the folder");
		if (!confirmed) return;
		const nodes = [...filesFolders];
		const q = [nodes];
		while (q.length) {
			const poppedNodes = q.pop()!;
			let shouldBreak = false;
			let idx = 0;
			for (let node of poppedNodes) {
				if (node.children && node.children.length > 0) {
					q.push(node.children);
				}
				if (node.id === parent) {
					shiftElements(poppedNodes, idx);
					shouldBreak = true;
					break;
				}
				idx++;
			}
			if (shouldBreak) break;
		}
		setFilesFolders(nodes);
	}
	function shiftElements(arr: any[], idx: number) {
		for (let i = idx + 1; i < arr.length; i++) {
			arr[i - 1] = arr[i];
		}
		arr.pop();
	}

	return (
		<div className="w-fit flex flex-col gap-1 my-1">
			<folderContext.Provider
				value={{
					addFile,
					deleteNode,
				}}
			>
				{filesFolders.map((data) =>
					data.children ? (
						<Folder {...data} key={data.name} />
					) : (
						<File name={data.name} key={data.name} />
					)
				)}
			</folderContext.Provider>
		</div>
	);
};

function Folder(props: FolderStructureType) {
	const [opened, setOpened] = useState(false);
	const { addFile, deleteNode } = use(folderContext);

	function toggleOpen() {
		setOpened((p) => !p);
	}

	function onAddFileClicked() {
		addFile(props.id);
	}

	function onFolderDelete() {
		deleteNode(props.id);
	}

	return (
		<div>
			<div className="flex flex-row items-center group">
				<p className="group text-blue-800 cursor-pointer" onClick={toggleOpen}>
					{opened ? "-" : "+"}
					<span className="group-hover:underline">{props.name}</span>
				</p>
				<div className="group-hover:flex hidden ml-2 flex-row justify-between gap-1">
					<p onClick={onAddFileClicked} className="px-[2px] outline ">
						+
					</p>
					<p onClick={onFolderDelete} className="px-[2px] outline ">
						D
					</p>
				</div>
			</div>
			{opened && props.children && props.children.length > 0 && (
				<div className="ml-3">
					{props.children.map((x) =>
						x.children ? (
							<Folder key={x.name} {...x} />
						) : (
							<File key={x.name} name={x.name} />
						)
					)}
				</div>
			)}
		</div>
	);
}

function File({ name }: { name: string }) {
	return (
		<div className="hover:underline cursor-pointer">
			&#x2022;
			{name}
		</div>
	);
}

export default FolderStructure;
