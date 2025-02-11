import { FC } from 'react';
import { TodoDto } from '../types/todo';

interface TodoProps {
	todo: TodoDto;
	deleteTodo: (id: number) => void;
	editTodo: (todo: TodoDto) => void;
}

const Todo: FC<TodoProps> = ({ todo, deleteTodo, editTodo }) => {
	return (
		<li className="flex justify-between gap-5 items-center">
			<div className="flex gap-3 items-center">
				<button
					className={
						todo.completed
							? 'p-3 border rounded-full bg-green-800'
							: 'p-3 border rounded-full'
					}
					onClick={() =>
						editTodo({ ...todo, completed: !todo.completed })
					}
				/>
				<span
					className={
						todo.completed ? 'line-through text-green-800' : ''
					}
				>
					{todo.title}
				</span>
			</div>
			<button
				className="bg-red-500 text-white rounded-md px-4 py-1"
				onClick={() => deleteTodo(todo.id)}
			>
				Delete
			</button>
		</li>
	);
};

export default Todo;
