import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";

interface Todo {
  id: number;
  text: string;
  isEditing: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    const newTask: Todo = { id: Date.now(), text: newTodo, isEditing: false };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const confirmDelete = (id: number) => {
    setTodoToDelete(id);
  };

  const deleteTodo = () => {
    if (todoToDelete !== null) {
      setTodos(todos.filter((todo) => todo.id !== todoToDelete));
      setTodoToDelete(null);
    }
  };

  const openEditModal = (todo: Todo) => {
    setTodoToEdit(todo);
  };

  const saveTodo = () => {
    if (todoToEdit) {
      setTodos(
        todos.map((todo) =>
          todo.id === todoToEdit.id
            ? { ...todo, text: todoToEdit.text, isEditing: false }
            : todo
        )
      );
      setTodoToEdit(null);
    }
  };

  const cancelEdit = () => {
    setTodoToEdit(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todoToEdit) {
      setTodoToEdit({ ...todoToEdit, text: e.target.value });
    }
  };

  const handleSeeMore = (id: number) => {
    navigate(`/todo/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Todo List
        </h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border border-purple-300 p-3 rounded-l-lg w-full outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            placeholder="Enter a new task..."
          />
          <button
            onClick={addTodo}
            className="bg-purple-500 text-white px-6 py-3 rounded-r-lg hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 transition duration-300"
          >
            Add
          </button>
        </div>

        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-200 text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 bg-gray-200 text-gray-600 text-left text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr
                key={todo.id}
                className="hover:bg-gray-100 transition duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg text-gray-700">{todo.text}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(todo)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => confirmDelete(todo.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => handleSeeMore(todo.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      <MdMoreHoriz />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {todoToDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Do you really want to delete?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setTodoToDelete(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                No
              </button>
              <button
                onClick={deleteTodo}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {todoToEdit !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Do you want to change your Task?
            </h2>
            <input
              type="text"
              value={todoToEdit.text}
              onChange={handleEditChange}
              className="border border-purple-300 p-3 rounded w-full outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                No
              </button>
              <button
                onClick={saveTodo}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
