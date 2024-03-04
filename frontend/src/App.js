import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css'; 

function Todo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [selectedTodos, setSelectedTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleSaveTodo = async () => {
        try {
            await axios.post('http://localhost:3001/save', { text: newTodo });
            setNewTodo('');
            fetchTodos();
        } catch (error) {
            console.error('Error saving todo:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/delete/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleSelectTodo = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/${id}`);
            const selectedTodo = response.data;

            // Check if the todo item is already selected
            const isSelected = selectedTodos.some(todo => todo._id === selectedTodo._id);

            if (isSelected) {
                // If the todo is already selected, remove it from the selectedTodos
                setSelectedTodos(selectedTodos.filter(todo => todo._id !== selectedTodo._id));
            } else {
                // If the todo is not selected, add it to the selectedTodos
                setSelectedTodos([...selectedTodos, selectedTodo]);
            }
        } catch (error) {
            console.error('Error fetching selected todo:', error);
        }
    };

    const handleDeleteSelectedTodos = async () => {
        try {
            await Promise.all(selectedTodos.map(todo => axios.delete(`http://localhost:3001/delete/${todo._id}`)));
            fetchTodos();
            setSelectedTodos([]);
        } catch (error) {
            console.error('Error deleting selected todos:', error);
        }
    };

    const isTodoSelected = (id) => {
        return selectedTodos.some(todo => todo._id === id);
    };

    return (
        <div className="container">
          <h1>Todo List</h1>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter todo"
            className="todo-input"
          />
          <button onClick={handleSaveTodo} className="add-btn">Add</button>
          <button onClick={handleDeleteSelectedTodos} className="delete-selected-btn">Delete Selected</button>
          <br/>
          <br/>
          <br/>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo._id} className={isTodoSelected(todo._id) ? 'selected' : ''}>
                {todo.text}
                <div>

                <button onClick={() => handleDeleteTodo(todo._id)} className="delete-btn">Delete</button>
                <button onClick={() => handleSelectTodo(todo._id)} className="select-btn">
                  {isTodoSelected(todo._id) ? 'Unselect' : 'Select'}
                </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
      
}

export default Todo;
