import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import { info } from "console";
import { useEffect } from "react";

const Wrapper = styled.div`
    display: flex;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
    align-items: center;
    height: 100vh;
`;

const Boards = styled.div`
    display: grid;
    width: 100%;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
`;

const AddBoardContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const AddBoard = styled.button`
    margin: 12px;
    color: black;
    border-radius: 1px;
    border-color: white;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
        const { destination, draggableId, source } = info;
        console.log(info);
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            // same board movement.
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }
        if (destination.droppableId !== source.droppableId) {
            // cross board movement
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]];
                const taskObj = sourceBoard[source.index];
                const destinationBoard = [...allBoards[destination.droppableId]];
                sourceBoard.splice(source.index, 1);
                destinationBoard.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            });
        }
    };

    const addBoard = () => {
        const newBoardName = `New Board ${Object.keys(toDos).length + 1}`;

        setToDos((prevToDos) => ({
            ...prevToDos,
            [newBoardName]: [],
        }));
    };

    const onDragEndTest = (info: DropResult) => {
        const { destination, draggableId, source, type } = info;
        console.log(info);
        if (!destination) return;

        if (type === "board") {
            // 보드 이동
            setToDos((allBoards) => {
                // 현재 보드 객체의 모든 키(보드 ID)를 배열로 가져옴
                const boardIds = Object.keys(allBoards);
                // 드래그된 보드의 인덱스를 찾음
                const boardIndex = boardIds.indexOf(draggableId);
                // 드래그된 보드 ID를 기존 위치에서 제거
                const [movedBoardId] = boardIds.splice(boardIndex, 1);
                // 새로운 위치에 보드 ID 삽입
                boardIds.splice(destination.index, 0, movedBoardId);
                // reduce: 배열의 각 요소를 순화하면서 누적값을 만들어내는 메서드
                const reorderedBoards = boardIds.reduce((acc: any, boardId) => {
                    acc[boardId] = allBoards[boardId];
                    return acc;
                }, {});
                // 순서가 변경된 보드 ID 배열을 기반으로 새로운 보드 객체를 생성
                return reorderedBoards; // 순서 변경된 보드 객체 반환
            });
        } else if (type === "DEFAULT") {
            // 같은 보드 내 항목 이동
            if (source.droppableId === destination.droppableId && source.index !== destination.index) {
                setToDos((allBoards) => {
                    const boardCopy = [...allBoards[source.droppableId]];
                    const [movedItem] = boardCopy.splice(source.index, 1);
                    boardCopy.splice(destination.index, 0, movedItem);

                    return {
                        ...allBoards,
                        [source.droppableId]: boardCopy,
                    };
                });
            }

            // 다른 보드로 항목 이동
            if (source.droppableId !== destination.droppableId) {
                setToDos((allBoards) => {
                    const sourceBoard = [...allBoards[source.droppableId]];
                    const destinationBoard = [...allBoards[destination.droppableId]];
                    const [movedItem] = sourceBoard.splice(source.index, 1);
                    destinationBoard.splice(destination.index, 0, movedItem);

                    return {
                        ...allBoards,
                        [source.droppableId]: sourceBoard,
                        [destination.droppableId]: destinationBoard,
                    };
                });
            }
        }
    };

    useEffect(() => {
        console.log("update toDos", toDos);
    }, [toDos]);
    return (
        // <div>
        //     <AddBoardContainer>
        //         <AddBoard onClick={addBoard}>보드 추가</AddBoard>
        //     </AddBoardContainer>
        //     <DragDropContext onDragEnd={onDragEnd}>
        //         <Wrapper>
        //             <Boards>
        //                 {Object.keys(toDos).map((boardId) => (
        //                     <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
        //                 ))}
        //             </Boards>
        //         </Wrapper>
        //     </DragDropContext>
        // </div>
        <div>
            <AddBoardContainer>
                <AddBoard onClick={addBoard}>보드 추가</AddBoard>
            </AddBoardContainer>
            <DragDropContext onDragEnd={onDragEndTest}>
                <Wrapper>
                    <Droppable droppableId="all-boards" direction="horizontal" type="board">
                        {(magic) => (
                            <Boards ref={magic.innerRef} {...magic.droppableProps}>
                                {Object.keys(toDos).map((boardId, index) => (
                                    <Draggable draggableId={boardId} key={boardId} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Board boardId={boardId} toDos={toDos[boardId]} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {magic.placeholder}
                            </Boards>
                        )}
                    </Droppable>
                </Wrapper>
            </DragDropContext>
        </div>
    );
}

export default App;

// input 태그 변경 로컬스토리지 저장
// 삭제
// 보드 이동 또는 새로운 보드 생성 (보드 생성을 우선시 해서 사용)
