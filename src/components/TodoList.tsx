import { FC, useEffect, useState } from 'react';
import { TodoDto } from '../types/todo';
import Todo from './Todo';
import AddTodo from './AddTodo';

const TodoList = () => {
	const [todos, setTodos] = useState<TodoDto[]>([]);

	const deleteTodo = (id: number) => {
		fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE',
		})
			.then(() =>
				setTodos((prev) => prev.filter((todo) => todo.id !== id))
			)
			.catch((err) => console.error('Error deleting todo:', err));
	};

	const editTodo = (todo: TodoDto) => {
		setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
	};

	const addTodo = (title: string) => {
		const newTodo = { id: Date.now(), title, completed: false };

		fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTodo),
		})
			.then((res) => res.json())
			.then((data) =>
				setTodos((prev) => [
					...prev,
					{
						id: Date.now(),
						title: data.title,
						completed: data.completed,
					},
				])
			)
			.catch((err) => console.error('Error adding todo:', err));
	};

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
			.then((res) => res.json())
			.then((data) => setTodos(data))
			.catch((err) => console.error('Error fetching todos:', err));
	}, []);

	return (
		<>
			<AddTodo addTodo={addTodo} />
			<ul className="flex flex-col gap-2">
				{todos.map((todo) => (
					<Todo
						key={todo.id}
						todo={todo}
						deleteTodo={deleteTodo}
						editTodo={editTodo}
					/>
				))}
			</ul>
		</>
	);
};

export default TodoList;
