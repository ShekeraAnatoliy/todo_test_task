import {
	useGetTodosQuery,
	useDeleteTodoMutation,
	useCreateTodoMutation,
	useUpdateTodoMutation,
} from '@/api/todoApi';
import { TodoDto } from '@/types/todo';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { useEffect, useState } from 'react';

const TodoList = () => {
	const { data, isLoading, error } = useGetTodosQuery();

	const [deleteTodo] = useDeleteTodoMutation();
	const [createTodo] = useCreateTodoMutation();
	const [updateTodo] = useUpdateTodoMutation();

	const [todos, setTodos] = useState<TodoDto[]>([]);

	const addTodo = async (title: string) => {
		try {
			const newTodo = await createTodo({ title }).unwrap();
			setTodos((prev) => [...prev, newTodo]);
		} catch (err) {
			console.error('Error adding todo:', err);
		}
	};

	const handleDeleteTodo = async (id: number) => {
		try {
			await deleteTodo(id).unwrap();
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (err) {
			console.error('Error deleting todo:', err);
		}
	};

	const handleToggleCompleted = async (id: number, completed: boolean) => {
		try {
			await updateTodo({
				id: id,
				completed: completed,
			}).unwrap();
			setTodos((prev) =>
				prev.map((t) =>
					t.id === id ? { ...t, completed: !t.completed } : t
				)
			);
		} catch (err) {
			console.error('Error updating todo:', err);
		}
	};

	useEffect(() => {
		if (data) setTodos(data);
	}, [data]);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	return (
		<>
			<AddTodo addTodo={addTodo} />
			<ul className="flex flex-col gap-2">
				{todos?.map((todo) => (
					<Todo
						key={todo.id}
						todo={todo}
						deleteTodo={handleDeleteTodo}
						updateTodo={handleToggleCompleted}
					/>
				))}
			</ul>
		</>
	);
};

export default TodoList;
