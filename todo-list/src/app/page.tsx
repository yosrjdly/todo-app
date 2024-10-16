"use client"
import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, XCircleIcon, ArchiveIcon, TrashIcon } from '@heroicons/react/outline';

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
  const [selectedTodos, setSelectedTodos] = useState<number[]>([]); // Store selected todos

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

  const toggleSelectTodo = (id: number) => {
    setSelectedTodos(prev =>
      prev.includes(id) ? prev.filter(todoId => todoId !== id) : [...prev, id]
    );
  };

  const archiveSelectedTodos = () => {
    setTodos(todos.map(todo => (selectedTodos.includes(todo.id) ? { ...todo, archived: true } : todo)));
    setSelectedTodos([]);
  };

  const deleteSelectedTodos = () => {
    setTodos(todos.filter(todo => !selectedTodos.includes(todo.id)));
    setSelectedTodos([]);
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

  const selectAllTodos = () => {
    if (selectedTodos.length === searchedTodos.length) {
      setSelectedTodos([]);
    } else {
      setSelectedTodos(searchedTodos.map(todo => todo.id));
    }
  };

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
          {['all', 'active', 'done', 'archived'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as typeof filter)}
              className={`p-2 rounded-full font-semibold transition-all ${
                filter === tab
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-700 text-yellow-400 hover:bg-purple-600 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Select All Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={selectedTodos.length === searchedTodos.length}
            onChange={selectAllTodos}
            className="mr-2 h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
          />
          <span className="text-gray-300">Select All</span>
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
                <input
                  type="checkbox"
                  checked={selectedTodos.includes(todo.id)}
                  onChange={() => toggleSelectTodo(todo.id)}
                  className="mr-2 h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                />
                {todo.done ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-yellow-400" />
                )}
                <span className={`flex-1 ${todo.done ? 'line-through' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleDone(todo.id)}
                  className="text-green-400 hover:text-green-500 transition-all flex items-center"
                >
                  <CheckCircleIcon className="w-5 h-5 mr-1" />
                  {todo.done ? 'Undo' : 'Done'}
                </button>
                {!todo.archived && (
                  <button
                    onClick={() => archiveTodo(todo.id)}
                    className="text-blue-400 hover:text-blue-500 transition-all flex items-center"
                  >
                    <ArchiveIcon className="w-5 h-5 mr-1" />
                    Archive
                  </button>
                )}
                <button
                  onClick={() => confirmDelete(todo)}
                  className="text-red-400 hover:text-red-500 transition-all flex items-center"
                >
                  <TrashIcon className="w-5 h-5 mr-1" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Archive/Delete Selected Buttons */}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={archiveSelectedTodos}
            className="flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            disabled={selectedTodos.length === 0}
          >
            <ArchiveIcon className="w-5 h-5 mr-1" />
            Archive Selected
          </button>
          <button
            onClick={deleteSelectedTodos}
            className="flex items-center justify-center bg-gradient-to-r from-red-400 to-red-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
            disabled={selectedTodos.length === 0}
          >
            <TrashIcon className="w-5 h-5 mr-1" />
            Delete Selected
          </button>
        </div>

        {/* Confirmation Modal for Deletion */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4">Confirm Deletion</h2>
              <p className="text-gray-300">Are you sure you want to delete this task?</p>
              <div className="flex justify-end mt-6 space-x-4">
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
    </div>
  );
}
