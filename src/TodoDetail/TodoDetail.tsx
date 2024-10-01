import React from "react";
import { useParams, Link } from "react-router-dom";

const TodoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const storedTodos = localStorage.getItem("todos");
  const todos = storedTodos ? JSON.parse(storedTodos) : [];
  const todo = todos.find((todo: { id: number }) => todo.id === Number(id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center">
      {todo ? (
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-center text-purple-600">
            Task Details
          </h1>
          <p className="text-lg text-gray-700 mb-4">{todo.text}</p>
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go back
          </Link>
        </div>
      ) : (
        <p className="text-lg text-gray-700">No task found!</p>
      )}
    </div>
  );
};

export default TodoDetail;
