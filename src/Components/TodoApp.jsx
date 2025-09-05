import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./TodoApp.module.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("All");

    const generateId = () =>
        Date.now().toString() + Math.random().toString(36).substr(2, 9);

    // Load tasks from localStorage
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    // Save tasks to localStorage
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Input handler
    const handleInput = (e) => setNewTask(e.target.value);

    // Add task
    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([
            ...tasks,
            { id: generateId(), text: newTask, isCompl: false, isEdit: false },
        ]);
        setNewTask("");
    };

    // Delete task
    const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

    // Toggle complete
    const toggCompl = (id) =>
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, isCompl: !task.isCompl } : task
            )
        );

    // Toggle edit
    const toggEdit = (id) =>
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, isEdit: !task.isEdit } : task
            )
        );

    // Handle edit input
    const handleEdit = (e, id) =>
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, text: e.target.value } : task
            )
        );

    // Save edited task
    const saveEdit = (id) => {
        const task = tasks.find((t) => t.id === id);
        if (!task.text.trim()) return;
        toggEdit(id);
    };

    // Clear completed tasks
    const clearCompleted = () => setTasks(tasks.filter((t) => !t.isCompl));

    // Filter tasks
    const filteredTasks =
        filter === "All"
            ? tasks
            : filter === "Completed"
                ? tasks.filter((t) => t.isCompl)
                : tasks.filter((t) => !t.isCompl);

    return (
        <div className={styles.container}>
            {/* Heading */}

            {/* Input Section */}
            <div className={styles.inputSection}>
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInput}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                    
                    placeholder="Enter task"
                    className={styles.input}
                />
                <button
                    onClick={addTask}
                    disabled={!newTask.trim()}
                    className={styles.addButton}
                    style={{
                        backgroundColor: !newTask.trim() ? "#ccc" : "#5becbbff",
                        cursor: !newTask.trim() ? "not-allowed" : "pointer",
                    }}
                >
                    Add Task
                </button>
            </div>

            {/* Filter Section */}
            <div className={styles.filterSection}>
                {["All", "Completed", "Pending"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={
                            filter === f
                                ? `${styles.filterButton} ${styles.filterButtonActive}`
                                : `${styles.filterButton} ${styles.filterButtonInactive}`
                        }
                    >
                        {f}
                    </button>
                ))}

                {tasks.some((t) => t.isCompl) && (
                    <button onClick={clearCompleted} className={styles.clearButton}>
                        Clear Completed
                    </button>
                )}
            </div>

            {/* Task Counter */}
            <p className={styles.counter}>
                Total: {tasks.length} | Completed: {tasks.filter((t) => t.isCompl).length}
            </p>

            {/* Task List */}
            <ul className={styles.taskList}>
                <AnimatePresence>
                    {filteredTasks.length === 0 && (
                        <motion.p
                            key="no-tasks"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ color: "#f90303ff", marginLeft:"10px" }}
                        >
                            No tasks to show!
                        </motion.p>
                    )}

                    {filteredTasks.map((task) => (
                        <motion.li
                            key={task.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                backgroundColor: task.isCompl ? "#bcebceff" : "#f9f9f9",
                                
                            }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className={styles.taskItem}
                        >
                            {/* Task Text */}
                            <div style={{ flexGrow: 1, marginRight: "10px" }}>
                                {task.isEdit ? (
                                    <input
                                        type="text"
                                        value={task.text}
                                        onChange={(e) => handleEdit(e, task.id)}
                                        className={styles.taskInput}
                                    />
                                ) : (
                                    <motion.span
                                        style={{ fontSize: "25px" }}
                                        animate={{
                                            textDecoration: task.isCompl ? "line-through" : "none",
                                            color: task.isCompl ? "#2e7d32" : "#333",
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {task.text}
                                    </motion.span>
                                )}
                            </div>

                            {/* Buttons */}
                            <div style={{ display: "flex", gap: "8px" }}>
                                <Button
                                    variant="contained"
                                    color={task.isCompl ? "warning" : "success"}
                                    startIcon={<CheckIcon style={{backgroundColor:"#09f309ff"}} />}
                                    sx={{
                                        fontSize: '14px',      // text size
                                        padding: '4px 12px',   // vertical & horizontal padding
                                        Width: '50px'  ,   // optional width control
                                        font:'bold',
                                        
                                        
                                    }}
                                    onClick={() => toggCompl(task.id)}
                                >
                                    {task.isCompl ? "Undo" : "Complete"}
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    sx={{
                                        fontSize: '12px',      // text size
                                        padding: '4px 12px',   // vertical & horizontal padding
                                        Width: '50px'  ,   // optional width control
                                        font:'bold'
                                        
                                    }}
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Delete
                                </Button>


                                {task.isEdit ? (
                                    <button
                                        onClick={() => saveEdit(task.id)}
                                        className={`${styles.taskButton} ${styles.saveButton}`}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<EditIcon />}
                                        sx={{
                                        fontSize: '12px',      // text size
                                        padding: '2px 8px',   // vertical & horizontal padding
                                        Width: '50px'  ,   // optional width control
                                        font:'bold'
                                        
                                    }}
                                        onClick={() => toggEdit(task.id)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    );
}

export default TodoApp;
