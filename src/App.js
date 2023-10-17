import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './components/Task';

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Medium");

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get('http://localhost:5000/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        }

        fetchTasks();
    }, []);

    const addTask = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tasks', {
                title,
                priority
            });
            setTasks([...tasks, response.data]);
            setTitle("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="App">
            <h1>Priority To-Do List</h1>
            
            <div>
                <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Task title"
                />
                <select value={priority} onChange={e => setPriority(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button onClick={addTask}>Add</button>
            </div>

            {tasks.map(task => (
                <Task key={task.id} task={task} />
            ))}
        </div>
    );
}

export default App;
