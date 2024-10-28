import React from "react";
import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";

function ToDo({ text, category, id }: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const setDeleteToDos = useSetRecoilState(toDoState);
    const toDosArray = useRecoilValue(toDoState);
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            const newToDo = { text, id, category: name as any };
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
        });
    };
    const deleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = event;
        setDeleteToDos((deleteToDos) => {
            const deleteIndex = deleteToDos.findIndex((toDo) => toDo.id === id);
            if (deleteIndex === -1) return deleteToDos;
            return [...deleteToDos.slice(0, deleteIndex), ...deleteToDos.slice(deleteIndex + 1)];
        });
    };
    console.log(toDosArray);
    return (
        <li>
            <span>{text}</span>
            {category !== Categories.DOING && (
                <>
                    <button name={Categories.DOING} onClick={onClick}>
                        Doing
                    </button>
                </>
            )}
            {category !== Categories.TO_DO && (
                <button name={Categories.TO_DO} onClick={onClick}>
                    To Do
                </button>
            )}
            {category !== Categories.DONE && (
                <button name={Categories.DONE} onClick={onClick}>
                    Done
                </button>
            )}
            <button onClick={deleteClick}>DELETE</button>
        </li>
    );
}

export default ToDo;
