import Button from "./Button";
import styles from "./App.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { func } from "prop-types";

function App() {
    const [toDo, setToDo] = useState("");
    const [toDos, setToDos] = useState([]);
    const onChange = (event) => setToDo(event.target.value);
    const onSubmit = (event) => {
        // 브라우저의 기본 동작을 방지하는 메서드 (페이지 새로고침을 방지)
        event.preventDefault();
        if (toDo === "") {
            return;
        }
        setToDos((currentArray) => [toDo, ...currentArray]);
        setToDo("");
    };
    return (
        <div>
            <h1>My To Dos ({toDos.length})</h1>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} type="text" placeholder="Write your to do..."></input>
                <button>Add To Do</button>
            </form>
            <hr />
            <ul>
                {toDos.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
export default App;
