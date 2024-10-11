import Button from "./Button";
import styles from "./App.module.css";
import React from "react";

function App() {
    const [counter, setValue] = React.useState(0);
    const onClick = () => setValue((prev) => prev + 1);
    console.log("call on api");
    return (
        <div>
            <h1>{counter}</h1>
            <button onClick={onClick}>click me</button>
        </div>
    );
}

export default App;
