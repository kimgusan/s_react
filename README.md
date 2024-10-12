# React

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

### React Router 구조 확인

-   npm install react-router-dom
-   router 는 URL을 보고 있는 componet.
    (Home 컴포넌트는 기본 URL, url 이 변경되는 부분에 대해서는 Detail 컴포넌트를 확인하면 된다.)
-   Browser Router / HashRouter

<hr/>

### Tip.

-   브라우저의 기본 동작을 방지하는 메서드 (페이지 새로고침을 방지)  
    event.preventDefault();
-   기존에 생성된 Array에 추가적인 값을 더하는 방법 '...'  
    setToDos((currentArray) => [toDo, ...currentArray])
