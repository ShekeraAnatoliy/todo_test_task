import { useState } from 'react';

interface AddTodoProps {
	addTodo: (title: string) => void;
}

const AddTodo = ({ addTodo }: AddTodoProps) => {
	const [title, setTitle] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!title.trim()) return;
		addTodo(title);
		setTitle('');
	};

	return (
		<form onSubmit={handleSubmit} className="flex justify-center m-4">
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Enter todo"
				className="border border-gray-300 rounded-md px-4 py-1 mr-2"
			/>
			<button
				type="submit"
				className="bg-blue-500 text-white rounded-md px-4 py-1"
			>
				Add
			</button>
		</form>
	);
};

export default AddTodo;
