"use client"

import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

interface Todo {
  id: number;
  text: string;
  done: boolean;
  archived: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'done' | 'archived'>('all');
  const [newTodo, setNewTodo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [taskToDelete, setTaskToDelete] = useState<Todo | null>(null); // Task to be deleted

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, done: false, archived: false }]);
      setNewTodo('');
    }
  };

  const toggleDone = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const archiveTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, archived: true } : todo));
  };

  // Open modal and set the task to delete
  const confirmDelete = (todo: Todo) => {
    setTaskToDelete(todo);
    setShowModal(true);
  };

  // Delete the task after confirmation
  const deleteTodo = () => {
    if (taskToDelete) {
      setTodos(todos.filter(todo => todo.id !== taskToDelete.id));
      setShowModal(false);
      setTaskToDelete(null);
    }
  };

  // Cancel the deletion process
  const cancelDelete = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done && !todo.archived;
    if (filter === 'done') return todo.done && !todo.archived;
    if (filter === 'archived') return todo.archived;
    return true;
  });

  const searchedTodos = filteredTodos.filter(todo => 
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-5xl font-bold text-yellow-300 mb-4 tracking-wide animate-pulse">
            My To-Do List
          </h1>
          <p className="text-gray-400 italic">Organize your tasks efficiently and in style</p>
        </header>

        {/* Input for adding new task */}
        <div className="flex justify-between items-center mb-6 space-x-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            className="w-3/4 p-3 rounded-full shadow-inner bg-gray-800 text-white focus:outline-none focus:ring-4 focus:ring-purple-600 transition-all duration-200 ease-in-out"
          />
          <button
            onClick={addTodo}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold p-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ease-in-out"
          >
            Add Task
          </button>
        </div>

        {/* Search Bar with Icon */}
        <div className="relative mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full p-3 pl-10 rounded-full bg-gray-800 text-white shadow-inner focus:outline-none focus:ring-4 focus:ring-purple-600 transition-all duration-200 ease-in-out"
          />
          <SearchIcon className="absolute left-3 top-3 w-6 h-6 text-gray-400" />
        </div>

        {/* Tabs for filtering TODOs */}
        <div className="flex space-x-4 mb-8 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`p-2 rounded-full font-semibold transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-yellow-400 hover:bg-purple-600 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`p-2 rounded-full font-semibold transition-all ${
              filter === 'active'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-yellow-400 hover:bg-purple-600 hover:text-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('done')}
            className={`p-2 rounded-full font-semibold transition-all ${
              filter === 'done'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-yellow-400 hover:bg-purple-600 hover:text-white'
            }`}
          >
            Done
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`p-2 rounded-full font-semibold transition-all ${
              filter === 'archived'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-700 text-yellow-400 hover:bg-purple-600 hover:text-white'
            }`}
          >
            Archived
          </button>
        </div>

        {/* Task list */}
        <ul className="space-y-4">
          {searchedTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-lg transition-transform ${
                todo.done ? 'bg-gray-800 text-gray-500' : 'bg-gray-700 text-white'
              } hover:shadow-2xl transform hover:scale-105`}
            >
              <div className="flex items-center space-x-4">
                {todo.done ? (
                  <span className="bg-green-500 text-black px-2 py-1 rounded-full text-sm">
                    Done
                  </span>
                ) : (
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-sm">
                    Active
                  </span>
                )}
                <span className={`flex-1 ${todo.done ? 'line-through' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleDone(todo.id)}
                  className="text-green-400 hover:text-green-500 transition-all"
                >
                  {todo.done ? 'Undo' : 'Mark as Done'}
                </button>
                {!todo.archived && (
                  <button
                    onClick={() => archiveTodo(todo.id)}
                    className="text-purple-400 hover:text-purple-500 transition-all"
                  >
                    Archive
                  </button>
                )}
                <button
                  onClick={() => confirmDelete(todo)} // Trigger the modal
                  className="text-red-400 hover:text-red-500 transition-all"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Confirming Deletion */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-yellow-400">Confirm Deletion</h2>
            <p className="text-gray-300">
              Are you sure you want to delete the task "{taskToDelete?.text}"?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={deleteTodo}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
