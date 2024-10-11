import Button from "./Button";
import styles from "./App.module.css";
import React from "react";
import { useState, useEffect } from "react";

function App() {
    const [counter, setValue] = React.useState(0);
    const onClick = () => setValue((prev) => prev + 1);
    console.log("i run all the time");
    const iRunOnlyOne = () => {
        console.log("i run only once.");
    };
    useEffect(iRunOnlyOne, []);
    return (
        <div>
            <h1>{counter}</h1>
            <button onClick={onClick}>click me</button>
        </div>
    );
}

export default App;
