import React, { useState } from "react";

const ToDoList = () => {
    const [inputValue, setInputValue] = useState("");
    const [toDos, setToDos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [hovered, setHover] = useState(-1);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            if (inputValue.trim() !== "") {
                setToDos([...toDos, { text: inputValue, completed: false }]);
                setInputValue("");
            } else {
                alert("Oops! You forgot to enter a task. Please try again.");
            }
        }
    };

    const handleDelete = (index) => {
        const deletedTodo = toDos[index];
        setCompletedTodos([...completedTodos, deletedTodo]);
        const updatedTodos = toDos.filter((_, i) => i !== index);
        setToDos(updatedTodos);
    };

    const activeTodoCount = toDos.filter((todo) => !todo.completed).length;
    const taskCountMessage =
        toDos.length === 0 ? "No tasks, add a task" : `${activeTodoCount} item${activeTodoCount !== 1 ? "s" : ""} left`;

    return (
        <div className="bigContainer">
            <h1>To Do List</h1>
            <div className="listContainer">
                <div className="textLine row lineItem">
                    <div className="col">
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="firstLine form-control"
                        />
                    </div>
                </div>
                {toDos.map((todo, index) => (
                    <div
                        className={`textLine row lineItem ${hovered === index ? "active" : ""}`}
                        key={index}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(-1)}>
                        <div className="col">{todo.text}</div>
                        {hovered === index && (
                            <div className="deleteXmark col-auto">
                                <i
                                    className="fa-solid fa-xmark"
                                    onClick={() => handleDelete(index)}
                                ></i>
                            </div>
                        )}
                    </div>
                ))}
                <div className="taskCount">{taskCountMessage}</div>
            </div>
            <span id="place1" className="placeholder placeholder-xs shadow"></span>
            <span id="place2" className="placeholder placeholder-xs shadow"></span>
        </div>
    );
};

export default ToDoList;
