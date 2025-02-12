import { TodoDto } from '../types/todo';

interface ITodoProps {
	todo: TodoDto;
	deleteTodo: (id: number) => void;
	updateTodo: (id: number, completed: boolean) => void;
}

const Todo = ({ todo, deleteTodo, updateTodo }: ITodoProps) => {
	return (
		<li className="flex justify-between gap-5 items-center">
			<div className="flex gap-3 items-center">
				<button
					className={
						todo.completed
							? 'p-3 border rounded-full bg-green-800'
							: 'p-3 border rounded-full'
					}
					onClick={() => updateTodo(todo.id, todo.completed)}
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
