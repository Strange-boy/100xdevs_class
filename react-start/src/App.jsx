import "./App.css";
import { useState } from "react";

function App() {
	//using state at the top
	const [todo, setTodo] = useState([
		{
			id: 0,
			title: "go for driving",
			description: "Go for driving in the morning",
			completed: false,
		},
		{
			id: 1,
			title: "Try doing dsa",
			description: "do some problems from strivers sheet",
			completed: true,
		},
		{
			id: 2,
			title: "harkirat's course",
			description: "Try to complete the assignments in 100x devs",
			completed: false,
		},
	]);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	//in order to add the user selected todos
	const handleTodos = () => {
		setTodo([
			...todo,
			{ id: todo.length + 1, title, description, completed: false },
		]);
		setTitle(""); //in order to set the title
		setDescription(""); //in order to set the description
	};

	//in order to remove the todo when the allocated task is done
	function handleCompleted(id) {
		const updatedTodo = todo.filter((task) => task.id != id);
		console.log(updatedTodo);
		setTodo(updatedTodo);
	}

	return (
		<>
			<div>
				<label htmlFor="">Title </label>
				<input
					type="text"
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>{" "}
				<br />
				<label htmlFor="">Description </label>
				<input
					type="text"
					onChange={(event) => {
						setDescription(event.target.value);
					}}
				/>
				<br />
				{/* <label htmlFor="">Completed</label>
				<input type="radio" name="completed" value="options" />
				<input type="radio" name="completed" value="options" /> */}
				<button
					onClick={() => {
						handleTodos();
					}}
				>
					Add the task
				</button>
			</div>
			{todo.map((task) => {
				return (
					<div key={task.id}>
						{task.completed === false ? (
							<Todo task={task} markTaskCompleted={handleCompleted} />
						) : null}
					</div>
				);
			})}
		</>
	);
}

function Todo({ task, markTaskCompleted }) {
	const { id, title, description, completed } = task;
	const handleTaskStatusClick = () => {
		markTaskCompleted(id);
		console.log(title, completed);
	};
	return (
		<div>
			<h2>{title}</h2>
			<h3>{description}</h3>
			<div>{completed === true ? "Done" : "Needs to be done"}</div>
			<button onClick={handleTaskStatusClick}>Task done</button>
		</div>
	);
}

export default App;
