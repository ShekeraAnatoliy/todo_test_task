import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TodoDto } from '@/types/todo';

const api = process.env.NEXT_PUBLIC_API_URL;

interface ICreateTodoRequest {
	title: string;
}

const todoApi = createApi({
	reducerPath: 'todoApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${api}/todos`,
	}),
	endpoints: (builder) => ({
		getTodos: builder.query<TodoDto[], void>({
			query: () => ({ url: '?_limit=10', method: 'GET' }),
		}),

		deleteTodo: builder.mutation<TodoDto, number>({
			query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
		}),
		createTodo: builder.mutation<TodoDto, ICreateTodoRequest>({
			query: (body) => ({ url: '', method: 'POST', body }),
		}),
		updateTodo: builder.mutation<
			TodoDto,
			{ id: number; completed: boolean }
		>({
			query: ({ id, completed }) => ({
				url: `/${id}`,
				method: 'PATCH',
				body: { completed },
			}),
		}),
	}),
});

export const {
	useGetTodosQuery,
	useDeleteTodoMutation,
	useCreateTodoMutation,
	useUpdateTodoMutation,
} = todoApi;
export default todoApi;
