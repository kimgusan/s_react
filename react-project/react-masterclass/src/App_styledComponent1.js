import styled from "styled-components";

const Father = styled.div`
    display: flex;
`;

const Box = styled.div`
    background-color: ${(props) => props.bgColor};
    width: 100px;
    height: 100px;
`;

const Circle = styled(Box)`
    border-radius: 50px;
`;
function App() {
    return (
        <Father>
            <Box bgColor="teal"></Box>
            <Circle bgColor="tomato" />
        </Father>
    );
}

// Styled Component2
// const Input = styled.input.attrs({ required: true, minLength: 10 })`
//     background-color: tomato;
// `;
// function App() {
//     return (
//         <Father as="header">
//             <Input />
//             <Input />
//             <Input />
//             <Input />
//             <Input />
//             <Input />
//         </Father>
//     );
// }

export default App;
