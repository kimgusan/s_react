# React Basic & Master Class

1. React 사용시 React script 와 React DOM을 먼저 import 해주어야한다.
2. interactive 동작을 위해 사용되었으며, 동적 요소들을 실기간으로 변경할 수 있다.
3. 컴포넌트가 변경될때마다 새로고침이 되는 특징이 있음.

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

-   const [counter, modifier] = React.useState(0); => 앞의 배열에서 0번째 인덱스의 값을 default 해주는 값: 0
-   위의 함수에서 modifier가 리랜더링을 일으킬수 있게 도와주는 함수 (return 값에 출력되는 값이 있기 때문에)
-   modifier: 함수를 사용할 때 컴포넌트가 재생성되면서 리랜더링이 진행.

    >

          function App() {
              const [counter, setCounter] = React.useState(0);
              const onClick = () => {
                  modifiter(counter + 1);
                  // modifiter((current) => counter + 1);
              };
              return (
                  <div>
                      <h3>Total Clicks: {counter}</h3>
                      <button onClick={onClick}>Click button</button>
                  </div>
              );
          }

-   setCounter((current) => counter + 1); => 현재 값을 가져와서 업데이트 해주는 부분. 안정성에서 해당 방식이 맞음

## input_and_state

-   js의 input 태그를 활용하는 방법과 event를 이용해 해당 input value 값을 가져오는 부분
    > function App() {
        const [minutes, setMinutes] = React.useState();
        const onChange = (event) => {
            setMinutes(event.target.value);
        };
        return (
            <div>
                <h1 className="hi">Super Converter</h1>
                <label htmlFor="minutes">Minutes</label>
                <input value={minutes} id="minutes" placeholder="Minutes" type="number" onChange={onChange} />
                <h4>You want to convert {minutes} </h4>
                <label htmlFor="hours">Hours</label>
                <input id="hour" placeholder="Hours" type="number" />
            </div>
        );
    }

## Select_Compunent

>

    function App() {
        const [index, setIndex] = React.useState("0");
        const onSelect = (event) => {
            setIndex(event.target.value);
        };
        return (
            <div>
                <h1>Super Converter</h1>
                <select value={index} onChange={onSelect}>
                    <option value="xx">Select Your unites</option>
                    <option value="0">Minutes & Hours</option>
                    <option value="1">KM & Milies</option>
                </select>
                <hr />
                {index === "xx" ? "Please select your units" : null}
                {index === "0" ? <MinutesToHours /> : null}
                {index === "1" ? <KmToMiles /> : null}
            </div>
        );
    }

## Prpos

-   props: 오브잭트이기 때문에 중괄호로 표현 가능.
-   props의 이름과 이벤트 리스터와 착각하지 말 것.
-   props항목에는 함수가 들어갈 수 있으며 해당 항목에 추가하면 실제로 프로퍼티에도 적용해줘야 한다.

>

    function Btn({ text, onClick }) {
        console.log(text, "was rendered");
        return (
            <button
                onClick={onClick}
                style={{
                    backgroundColor: "tomato",
                    color: "white",
                    padding: "10px, 20px",
                    borderRadius: 10,
                    fontSize: 20,
                }}
            >
                {text}
            </button>
        );
    }

    function App() {
        const [value, setValue] = React.useState("Save Changes");
        const changeValue = () => {
            setValue("Revert Changes");
        };
        return (
            <div>
                <Btn text={value} onClick={changeValue} />
                <Btn text="Continue" />
            </div>
        );
    }

### prop memo

-   특정 프로퍼티만 변경하고 이후 다른 프로퍼티는 변경하지 않는 부분.

>

    const MemorizedBtn = React.memo(Btn);

    function App() {
        const [value, setValue] = React.useState("Save Changes");
        const changeValue = () => {
            setValue("Revert Changes");
        };
        return (
            <div>
                <MemorizedBtn text={value} onClick={changeValue} />
                <MemorizedBtn text="Continue" />
            </div>
        );
    }

### porp type

-   prop 항목에 어떤 타입이 들어올지 넣어놓는 것. (경고가 나타나며 에러와는 다른 항목)
-   사용 시 prop-type에 대한 부분이 import 되어야 함
-   isRequired: 반드시 필요로(정확한 타입) 하는 것.
-   정의되지 않는 prop 에 대해서는 function 에서 prop 인자를 받을 때 deafult 값을 정해줄 수 있다.

    >

        Btn.propTypes = {
            text: PropTypes.string.isRequired,
            fontsize: PropTypes.number,
        };

## React Project init(Create React App)

-   npx create-react-app my-app
-   ~ npm start
-   React 의 경우 모두 스타일시트도 모두 모듈화가 가능하기 때문에 유지보수에 장점이 있다.

## React Effect

-   언제 코드를 실행시킬 수 있는지 선택할 수 있는 방법.
-   React.useEffect(function, [depandency]) : 내부에는 2가지 요소(argument)가 들어가며 앞쪽에는 실행될 함수를 적는다.

>

    useEffect(() => {
        console.log("CALL THE API...");
    }, []);

---

    useEffect(() => {
        if (keyword !== "" && keyword.length > 5) {
            console.log("SEARCH FOR", keyword);
        }
    }, [keyword]);

    useEffect(() => {
        console.log("I run when 'counter' changes.");
    }, [counter]);

### Use Effect Clean Up function

-   component가 없어질 때 결과를 보내주는 방법

>

    function Hello() {
        function byFn() {
            console.log("Bye :(");
        }
        function hiFn() {
            console.log("crated :)");
            return byFn;
        }
        useEffect(hiFn, []);
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

---

>

     useEffect(() => {
        console.log("hi");
        return () => {
        console.log("by");
        };
     }, []);

### fetch && async, await

### React Router 구조 확인

-   npm install react-router-dom
-   router 는 URL을 보고 있는 componet..
    (Home 컴포넌트는 기본 URL, url 이 변경되는 부분에 대해서는 Detail 컴포넌트를 확인하면 된다.)
-   Browser Router / HashRouter
-   useParams: React parameter 의 값을 넘겨줌
    > const { id } = useParams(); (=> url에 입력된 값을 나타낼 수 있음) useParams (훅)

<hr/>

### Tip.

-   브라우저의 기본 동작을 방지하는 메서드 (페이지 새로고침을 방지)  
    event.preventDefault();
-   기존에 생성된 Array에 추가적인 값을 더하는 방법 '...'  
    setToDos((currentArray) => [toDo, ...currentArray])
-   git-hub에서 제공하는 배포 라이브러리 npm i gh-pages (이후 package 항목에 build 등 추가 해야하는 항목들이 있다.)

1. Breaking Code : 새로운 버젼이 나왔을 때 기존 코드를 변경하고 싶을 때 사용하는 방법.

---

# React Master Class

### Tip.

1. Styled Components

-   아래와 같은 형태로 표현될 수 있으며 클래스명을 지정할 필요 없이 css 속성 부여를 할 수 있아.
-   컴포넌트에서는 변수 값을 props 형태로 설정할 수 있으며 확장 또한 가능하다.

    >

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

-   attrs 항목으로 속성값을 부여할 수 있으며 다중으로 반복되는 항목에 대하여 설정할 수 있다.

>

    const Input = styled.input.attrs({ required: true, minLength: 10 })`
        background-color: tomato;
    `;

2. animation 효과를 넣기 위해서는 keyframe 이라는 라이브러리리를 사용한다.

-   import styled, { keyframes } from "styled-components";

>

    const rotationAnimation = keyframes`
        0% {
            transform:rotate(0deg);
            border-radius: 0px;

        }
        50%{
            transform: rotate(360deg);
            border-radius: 100px;
        }
        100%{
            transform:rotate(720deg);
            border-radius: 0px;
        }
    `;

    const Box = styled.div`
        height: 200px;
        width: 200px;
        background-color: tomato;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: ${rotationAnimation} 4s linear infinite;
        span {
            font-size: 36px;
            &:hover {
                font-size: 80px;
            }
            &:active {
               opacity: 0;
            }
        }
    `;

3.  다크모드와 같은 기능을 구현하기 위해서는 Theme을 사용하는 방법이 있다.

    > index.js 이동 -> import {ThemeProvider} from 'styled-components' 적용

        import React from "react";

        const darkTheme = {
            textColor: "whitesmoke",
            backgroundColor: "#111",
        };

        const lightTheme = {
            textColor: "#111",
            backgroundColor: "whitesmoke",
        };

        const root = ReactDOM.createRoot(document.getElementById("root"));
        root.render(
            <ThemeProvider theme={lightTheme}>
                <App />
            </ThemeProvider>

---

## TypeScript: JavaScript를 기반으로 하는 언어.

-   strongly-typed 언어: 프로그래밍 언어가 작동하기 전에 확인하는 언어.
-   JavaScript에 대해서 사용되는 일부 라이브러리에 대하여 사용하기 위해서는 추가 적으로 install 을 해줘야한다
    -interface 는 object 설명

    >

        interface CircleProps{
            bgColor:string
        }

-   TypeScript interface Optional Props기능.

    >

        interface CircleProps {
            bgColor: string; // required
            borderColor?: string; // optional
            text?: string;
        }

        function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
            return (
                <Container $bgColor={bgColor} $borderColor={borderColor ?? bgColor}>
                    {text}
                </Container>
            );
        }

-   TypeScript interface State.

    >

        const [value, setValue] = useState<number | string>(0);

-   input, submit 사용 시 가져오는 방법. (event: React.FormEvent<...>)  
    (등등 공식 문서를 참고할 것.)

>

    const [value, setValue] = useState("");
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
            currentTarget: { value },
        } = event;
        setValue(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("hello", value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={value} onChange={onChange} type="text" placeholder="username"></input>
                <button>Log in</button>
            </form>
        </div>
    );

Tip.

1. const GlobalStyle = createGlobalStyle`` (전역 변수 설정 관련)
2. 비하인드 더 씬 옵션 , 다른 페이지로 넘어갈 때 정보를 데이터를 넘기는 방법.

>

    <Link to {{
        pathname: "/{coin.name}",
        state: {name: coin.name},
    }}>

3. fetch (async-await): 캡슐화 방법

-   가져온 데이터에 대하여 사용하기 전에 typescript의 특징인 값에 대하여 설명해주는 작업이 필요하다.  
    (콘솔 창에서 Object.values(temp1).map(v => typeof v)) 이와 같은 형태로 나타낼 수 있다.

>

     useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    }, []);

4.  const chartMatch = useRouteMatch("/:coinId/chart"); 내가 선택한 url에 정상적으로 들어가있는지 확인하는 방법.

    >

        <Tab isActive={priceMatch !== null}>
            <Link to={`/${coinId}/Price`}>Price</Link>
        </Tab>

5.  React query

-   fetcher function
-   api.ts 파일에 fetch 함수를 넣어놓고 josn 값을 리턴하면 useQuery hook 를 사용해서 boolean 값과, json으로 불러온 data 값을 모두 사용할 수 있기 때문에 한줄로 표현이 가능하다.
-   캐시를 저장하고 있기 떄문에 데이터를 파괴하지 않는다. (단순 fetch를 이용하는 부분과 다르다.)
-   interval 항목을 사용하여 백그라운드에서 해당 호출을 몇초마다 할 지 정할 수 있다.

>

    // 전달할 return 값이 있을 때는 아래와 같이 작성한다.
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () =>
        fetchCoinInfo(coinId)

    );
    const { isLoading: tickersLoading, data: tickerData } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
    );

### Tip.

1. apexcharts.com : 차트 관련 사이트
2. react-helmet : favicon 에 들어가는 title을 변경할 수 있다. direct link  
   (`<Helmet><title></title></Helmet>`)

---

npm i --save-dev @types/react-query

twillo
DDUW7P45Q1TN6CLTHYVA1LN5
