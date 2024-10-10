# React

1. React 사용시 React script 와 React DOM을 먼저 import 해주어야한다.
2. interactive 동작을 위해 사용되었으며, 동적 요소들을 실기간으로 변경할 수 있다.

## JSX (1.3_index)

-   JavaScript 를 확장한 문법
-   Babel: JSX로 적은 코드를 브라우저가 이해할 수 있는 형태로 변경
-   컴포넌트(함수)의 첫글자는 대문자로 적을 것.

## state (3.0_index)

-   데이터 저장관련 영역, 바뀌는 데이터 저장
-   페이지를 로드했을 때 함수가 바로 실행되지 않으며 render 에 있는 항목만 실행 => 따라서 리랜더링하는 부분이 필요
-   React.useState() / [data, function]

    > const x = [1,2,3]
    > const [a, b, c] = x

-   const [counter, setCounter] = React.useState(0);
-   위의 함수에서 modifier가 리랜더링을 일으킬수 있게 도와주는 함수 (return 값에 출력되는 값이 있기 때문에)

    >

        function App() {
            const [counter, setCounter] = React.useState(0);
            const onClick = () => {
                modifiter(counter + 1);
            };
            return (
                <div>
                    <h3>Total Clicks: {counter}</h3>
                    <button onClick={onClick}>Click button</button>
                </div>
            );
        }
