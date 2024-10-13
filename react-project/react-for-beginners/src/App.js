import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Details from "./routes/Details";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/hello" element={<h1>Hello</h1>} />
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<Details />} />
            </Routes>
        </Router>
    );
}
export default App;
