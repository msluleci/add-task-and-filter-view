import React, {useEffect, useState} from 'react';
import './App.css';

interface Props {
}

interface Task {
    title: string
    description: string
    priority: string
}

const initialTasks: Task[] = [];

function App(props: Props) {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const priorityList = [
        {text: 'High', id: 1},
        {text: 'Medium', id: 2},
        {text: 'Low', id: 3},
    ]

    useEffect(() => {
        setPriority(priorityList[0].text);
        setFilterPriority(priorityList[0].text);
    }, []);

    const onClick = () => {
        setTasks((prevTasks) => {
            const newTask: Task = {
                title: title,
                description: desc,
                priority: priority,
            };

            return [...prevTasks, newTask];
        });
    }

    const filteredTaskList = tasks.filter((task) => task.priority === filterPriority);

    /*const filteredAndSortedTasks = tasks
        // Filter tasks based on priority (e.g., filter high priority tasks)
        .filter(task => task.priority === 'High' || task.priority === 'Medium' || task.priority === 'Low')
        // Sort filtered tasks by priority (you can adjust the sorting logic as needed)
        .sort((taskA, taskB) => {
            // Assuming priority is a string (e.g., 'Low', 'Medium', 'High')
            const priorityOrder = ['Low', 'Medium', 'High'];
            return priorityOrder.indexOf(taskA.priority) - priorityOrder.indexOf(taskB.priority);
        });*/

    return (
        <div className='general-section'>
            <div className='form-container'>
                <label htmlFor="title">Title:</label><br/>
                <input type="text" id="title" name="title" value={title}
                       onChange={(event) => setTitle(event.target.value)}/>
                <br/>
                <label htmlFor="description">Description:</label>
                <br/>
                <input type="text" id="desc" name="desc" value={desc}
                       onChange={(event) => setDesc(event.target.value)}/>
                <br/>
                <label htmlFor="priority">Select Priority:</label>
                <br/>
                <select name="priority" id="priority" onChange={(e) => setPriority(e.target.value)}>
                    {priorityList.map((item) => (
                        <option value={item.text} key={item.id}>{item.text}</option>
                    ))}
                </select>
                <br/><br/>
                <button onClick={onClick}>Click</button>
            </div>

            <div>
                <div className='task-table-container'>
                    <table>
                        <tr>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Priority</td>
                        </tr>
                        {
                            filteredTaskList && filteredTaskList.map((task) => {
                                return (
                                    <tr>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>{task.priority}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                    <div className='filter-priority-select'>
                        <div className='filter-priority-select-container'>
                            <span>Filter</span>
                            <select name="filter-priority" id="filter-priority"
                                    onChange={(e) => setFilterPriority(e.target.value)}>
                                {priorityList.map((item) => (
                                    <option value={item.text} key={item.id}>{item.text}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
