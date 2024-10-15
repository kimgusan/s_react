import styled, { keyframes } from "styled-components";
import React, { useState } from "react";
// import Circle from "./Circle";

const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 25px;
`;

interface DummpyProps {
    text: string;
    active?: boolean;
}

function Dummy({ text, active = false }: DummpyProps) {
    return <H1>{text}</H1>;
}

function App() {
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {};
    return (
        <Container>
            <Dummy active text="hello"></Dummy>
            <button onClick={onClick}>Click Me</button>
        </Container>
    );
}

export default App;
