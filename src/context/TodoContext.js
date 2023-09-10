import { createContext, useState, useContext } from "react";


export const TodoContext = createContext();
export const TodoProvider = (props) => {
    const [allTodos, setTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);

    return (
        <TodoContext.Provider value={[allTodos, setTodos, completeTodos, setCompleteTodos]}>
            {props.children}
        </TodoContext.Provider>
    )

}

// export const useTodoContext = () => {
//     return useContext(TodoContext);
// }