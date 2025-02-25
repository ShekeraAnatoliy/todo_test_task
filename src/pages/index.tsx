import TodoList from '../components/TodoList';

const Home = () => {
	return (
		<div className="flex flex-col items-center gap-4 border p-5 border-gray-300 rounded-lg shadow-md w-fit mx-auto my-5">
			<h1 className="text-2xl font-bold">Todo List</h1>
			<TodoList />
		</div>
	);
};

export default Home;
