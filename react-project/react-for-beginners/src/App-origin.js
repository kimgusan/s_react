import Button from "./Button";
import styles from "./App.module.css";
import React from "react";
import { useState, useEffect } from "react";

// function App() {
//     const [counter, setValue] = React.useState(0);
//     const [keyword, setKeyword] = useState("");
//     const onClick = () => setValue((prev) => prev + 1);
//     const onChange = (event) => setKeyword(event.target.value);
//     useEffect(() => {
//         console.log("I run only once");
//     }, []);
//     useEffect(() => {
//         console.log("I run when 'keyword' changes.");
//     }, [keyword]);
//     useEffect(() => {
//         console.log("I run when 'counter' changes.");
//     }, [counter]);
//     useEffect(() => {
//         console.log("I run then keyword & counter chagnge.");
//     }, [counter, keyword]);
//     return (
//         <div>
//             <input value={keyword} onChange={onChange} type="text" placeholder="Search here..." />
//             <h1>{counter}</h1>
//             <button onClick={onClick}>click me</button>
//         </div>
//     );
// }

/* Clean Up useEffect*/
function Hello() {
    // function byFn() {
    //     console.log("Bye :(");
    // }
    // function hiFn() {
    //     console.log("crated :)");
    //     return byFn;
    // }
    // useEffect(hiFn, []);

    // useEffect(() => {
    //     console.log("hi");
    //     return () => {
    //         console.log("by");
    //     };
    // }, []);

    useEffect(function () {
        console.log("hi");
        return function () {
            console.log("by");
        };
    }, []);
    return <h1>Hello</h1>;
}

function App() {
    const [showing, setShowing] = useState(false);
    const onClick = () => setShowing((prev) => !prev);
    return (
        <div>
            {showing ? <Hello /> : null}
            <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
        </div>
    );
}
export default App;
