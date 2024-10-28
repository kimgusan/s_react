import { atom, selector } from "recoil";
import ToDo from "./components/ToDo";

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export const categoryState = atom<Categories>({
    key: "category",
    default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});

// 코드첼린지 삭제 기능
