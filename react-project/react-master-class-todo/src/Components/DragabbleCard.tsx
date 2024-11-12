import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React, { useEffect } from "react";
import { toDoState } from "../atoms";
import { useRecoilValue, useRecoilState } from "recoil";

const Card = styled.div<{ isDragging: boolean }>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => (props.isDragging ? "#74b9ff" : props.theme.cardColor)};
    box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none")};
    display: flex;
    justify-content: space-between;
`;

const DeleteButton = styled.button`
    color: black;
`;

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

// 로컬 스토리지에 저장하는 함수 구현
// 실제로 로컬스토리지에 실시간으로 담는다고 생각했을 때 toDoText 가 로컬 스토리지 배열에 담겨있는다고 생각하면 될 듯.
// 최초로 페이지가 랜더링 됐을 때 로컬스토리지에 빈 배열이 생기고 이후 입력한 값에 대해서 넣어주면됌
// 실제로는 atom 에 있는 key 값에 대해서 빈 배열을 생성
// 입력한 내용에 대해서 스토리리 입력

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
    // atom 에 있는 state에 대하여 defalt 값을 가져온다 (toDoId)
    const [toDoData, setToDoData] = useRecoilState(toDoState);

    const toDoTitles = Object.keys(toDoData);
    const toDoContexts = Object.values(toDoData);

    // 로컬스토리지에 저장하는 부분
    useEffect(() => {
        // 해당 부분은 item이 아니라 toDo key가 들어가야함
        toDoTitles.forEach((title, index) => {
            const context = toDoContexts[index];
            // id, text 를 넣고 싶지 않아서 text 로 변환
            const textArray = context.map((content) => content.text);
            // localStorage의 경우 string 형식만 저장이 가능하여 json 형태로 변경하여 저장
            localStorage.setItem(title, JSON.stringify(textArray));
        });
    }, [toDoData]);

    // 삭제하기 위해서는 useRecoilValue가 아니라 useSetRecoilState 또는 useRecoilState를 사용한다.
    // 삭제할 때 특정 값을 빼는게 아니라 그 값을 제외하고 다시 copy 배열을 만든다는 의미.
    // 단 데이터가 적은경우 사용하며 많아지면 성능 이슈가 발생할 수 있음, 따라서 특정 key의 값만 삭제해야한다면 해당 배열만 삭제하도록 지정할 수 있음
    // 삭제 버튼 클릭 핸들러
    const deleteClick = () => {
        setToDoData((prev) => {
            const copyData = { ...prev };
            Object.keys(copyData).forEach((key) => {
                copyData[key] = copyData[key].filter((item) => item.id !== toDoId);
            });
            return copyData;
        });
    };

    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                    {toDoText}
                    <DeleteButton onClick={deleteClick}>삭제</DeleteButton>
                </Card>
            )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard);
