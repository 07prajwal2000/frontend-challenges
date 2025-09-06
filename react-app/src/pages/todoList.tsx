import { createContext, use, useState } from "react";

type TodoType = {
	id: string;
	title: string;
	completed: boolean;
};

function genID() {
	return crypto.randomUUID();
}
const defaultTodos: TodoType[] = [
	{
		id: genID(),
		completed: false,
		title: "Clean room",
	},
	{
		id: genID(),
		completed: false,
		title: "Daily chores",
	},
	{
		id: genID(),
		completed: true,
		title: "Drink Coffee",
	},
];

const todosContext = createContext<{
	addTodo(): void;
	updateTodo(todo: TodoType): void;
	deleteTodo(todoId: string): void;
}>({} as any);

function useTodoContext() {
	return use(todosContext);
}

function loadTodoItems() {
	const todoItems = localStorage.getItem("todos");
	if (!todoItems) return defaultTodos;
	const parsed = JSON.parse(todoItems);
	if (parsed instanceof Array) return parsed;
	return defaultTodos;
}

const TodoList = () => {
	const [todos, setTodos] = useState<TodoType[]>(loadTodoItems());
	function addTodo() {
		const todoTitle = prompt("Enter the todo title")?.trim();
		if (!todoTitle || todoTitle.length == 0) return;
		setTodos((p) => [
			...p,
			{
				id: genID(),
				completed: false,
				title: todoTitle,
			},
		]);
	}
	function updateTodo(todo: TodoType) {
		const newTodos = [...todos];
		for (let i = 0; i < newTodos.length; i++) {
			if (newTodos[i].id !== todo.id) continue;
			newTodos[i] = todo;
			break;
		}
		setTodos(newTodos);
	}
	function deleteTodo(todoId: string) {
		setTodos((p) => p.filter((x) => x.id !== todoId));
	}
	function onSaveClicked() {
		localStorage.setItem("todos", JSON.stringify(todos));
	}
	return (
		<todosContext.Provider
			value={{
				addTodo,
				updateTodo,
				deleteTodo,
			}}
		>
			<div>
				<div className="flex flex-col w-[50vw] mx-auto gap-3">
					<div className="flex flex-row justify-between">
						<h2 className="text-center">TODO List</h2>
						<div className="flex flex-row gap-2">
							<button
								className="border border-green-800 cursor-pointer size-8 rounded-full bg-green-500 text-white"
								onClick={addTodo}
							>
								+
							</button>
							<button
								className="border cursor-pointer px-2 rounded-md bg-violet-700 text-white"
								onClick={onSaveClicked}
							>
								Save
							</button>
						</div>
					</div>
					<hr />
					{todos
						.sort((a) => (a.completed ? 1 : -1))
						.map((todo) => (
							<Todo todo={todo} key={todo.id} />
						))}
				</div>
			</div>
		</todosContext.Provider>
	);
};

function Todo({ todo }: { todo: TodoType }) {
	const { updateTodo, deleteTodo } = useTodoContext();

	function toggleCompletion() {
		todo.completed = !todo.completed;
		updateTodo(todo);
	}
	function onEditClick() {
		const todoTitle = prompt("Enter the todo title", todo.title)?.trim();
		if (!todoTitle || todoTitle.length == 0) return;
		todo.title = todoTitle;
		updateTodo(todo);
	}
	function onDeleteClick() {
		const isConfirmed = confirm("Are you sure want to delete the todo item?");
		if (!isConfirmed) return;
		deleteTodo(todo.id);
	}

	return (
		<div className="border p-2 rounded-md gap-1 grid grid-cols-12">
			<h3
				className={`col-span-8 text-wrap ${
					todo.completed && "line-through text-green-800"
				}`}
			>
				{todo.title}
			</h3>
			{todo.completed ? (
				<div className="col-span-2"></div>
			) : (
				<button
					onClick={onEditClick}
					className="col-span-2 border h-fit rounded-md cursor-pointer"
				>
					Edit
				</button>
			)}
			<button
				onClick={toggleCompletion}
				className="col-span-1 border h-fit rounded-md cursor-pointer"
			>
				{todo.completed ? "❌" : "✅"}
			</button>
			<button
				onClick={onDeleteClick}
				className="col-span-1 border h-fit rounded-md cursor-pointer"
			>
				Del
			</button>
		</div>
	);
}

export default TodoList;
