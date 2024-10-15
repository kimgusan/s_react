import { useEffect, useState } from "react";
import styled from "styled-components";

interface ContainerProps {
    $bgColor: string;
    $borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.$bgColor};
    border-radius: 100px;
    border: 1px solid ${(props) => props.$borderColor};
`;

interface CircleProps {
    bgColor: string; // required
    borderColor?: string; // optional
    text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
    const [value, setValue] = useState<number | string>("");
    return <Container $bgColor={bgColor} $borderColor={borderColor ?? bgColor}></Container>;
}
export default Circle;

// interface PlayerShape {
//     name: string;
//     age: number;
// }

// const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name} your are ${playerObj.age}`;

// sayHello({ name: "nice", age: 12 });
// sayHello({ name: "hi", age: 12 });
