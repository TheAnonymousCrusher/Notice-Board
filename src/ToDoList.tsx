import './ToDoList.css'
import React, { useState, useEffect } from 'react';
import "https://unpkg.com/typewriter-effect@latest/dist/core.js"

const ADMIN_PASSWORD = "admin123";

function ToDoList() {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem('tasks');
		return savedTasks ? JSON.parse(savedTasks) : [];
	});

	const [newTask, setNewTask] = useState("");

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	function handleInputChange(event) {
		setNewTask(event.target.value);
	}

	function addTask() {
		const password = window.prompt('Please enter the admin password:');
		if (password === ADMIN_PASSWORD && newTask.trim() !== "") {
			setTasks(t => {
				const updatedTasks = [...t, newTask];
				localStorage.setItem('tasks', JSON.stringify(updatedTasks));
				return updatedTasks;
			});
			setNewTask("");
		} else {
			window.alert('Incorrect password! The note could not be added.');
		}
	}

	function deleteTask(index) {
		const password = window.prompt('Please enter the admin password:');
		if (password === ADMIN_PASSWORD) {
			const updatedTasks = tasks.filter((_, i) => i !== index);
			setTasks(updatedTasks);
		} else {
			window.alert('Incorrect password! The note could not be deleted.');
		}
	}

	function moveTaskUp(index) {
		const password = window.prompt('Please enter the admin password:');
		if (password === ADMIN_PASSWORD && index > 0) {
			const updatedTasks = [...tasks];
			[updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
			setTasks(updatedTasks);
		} else {
			window.alert('Incorrect password! The note could not be moved up.');
		}
	}

	function moveTaskDown(index) {
		const password = window.prompt('Please enter the admin password:');
		if (password === ADMIN_PASSWORD && index < tasks.length - 1) {
			const updatedTasks = [...tasks];
			[updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
			setTasks(updatedTasks);
		} else {
			window.alert('Incorrect password! The note could not be moved down.');
		}
	}


	// TypewriterJS Snippet
	var app = document.getElementById('typewriter');

	var typewriter = new Typewriter(app, {
		loop: true,
		delay: 75,
	});

	typewriter
		.pauseFor(200)
		.typeString('ANNOUNEMENTS')
		.pauseFor(1000)
		.deleteChars(12)
		.typeString('TAKE NOTE <span style="color: #27ae60;">CAREFULLY</span>.')
		.pauseFor(1000)
		.start();


	// Front End Stuff
	return (

		<div className="to-do-list">

			{/* UJMA Logo */}
			<div className="pic-container">
				<img className="pic" src="ujma.jpg"></img>
			</div>

			{/* Heading */}
			<h1 id='typewriter'></h1>
			{/* <h1>ANNOUNCEMENTS</h1> */}

			{/* Input Bar */}
			<div>
				<input type="text" placeholder="Enter a note..." value={newTask} onChange={handleInputChange} />
				<button className="add-button" onClick={addTask}> + </button>
			</div>

			<br></br>

			{/* List */}
			<ol>{tasks.map((task, index) =>

				// Individual List Item
				<li key={index}>

					{/* Actual Not Content */}
					<span className="text">{task}</span>

					{/* Item Modifier Buttons */}
					<button className="delete-button" onClick={() => deleteTask(index)}> ✖ </button>
					<button className="move-button" onClick={() => moveTaskUp(index)}> ↑ </button>
					<button className="move-button" onClick={() => moveTaskDown(index)}> ↓ </button>

				</li>
			)}

			</ol>

		</div>
	);
}

export default ToDoList;