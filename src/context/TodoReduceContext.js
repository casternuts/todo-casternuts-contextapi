import React, { useMemo, createContext, useReducer, useContext } from 'react';

// todoReducer 에서 사용 할 기본 상태
const initialState = {
    allTodos: [],
    completeTodos: []
};
// // 로딩중일 때 바뀔 상태 객체
// const loadingState = {
//     loading: true,
//     data: null,
//     error: null
// };
// // 성공했을 때의 상태 만들어주는 함수
// const success = data => ({
//     loading: false,
//     data,
//     error: null
// });

// // 실패했을 때의 상태 만들어주는 함수
// const error = error => ({
//     loading: false,
//     data: null,
//     error: error
// });
const setTodos = (state, action) => {
    let statemap = {
        ...state,
        allTodos: [...state.allTodos, action.payload]
    };
    localStorage.setItem('todolist', JSON.stringify(statemap.allTodos));
    return statemap;
}
const setCompTodos = (state, action) => {
    let statemap = {
        ...state,
        completeTodos: [...state.completeTodos, action.payload]
    };
    localStorage.setItem('completedTodos', JSON.stringify(statemap.completeTodos));
    return statemap;
}
const setTodosComplete = (state, action) => {
    let statemap = {
        ...state,
        allTodos: [...state.completeTodos, action.payload]
    };
    localStorage.setItem('completedTodos', JSON.stringify(statemap.allTodos));
    return statemap;
}
const setDelTodos = (state, action) => {
    let statemap = {
        ...state,
        allTodos: state.allTodos.filter((todo, index) => index !== action.payload),
    };
    localStorage.setItem('todolist', JSON.stringify(statemap.allTodos));
    return statemap;
}
const setDelCompTodos = (state, action) => {
    console.log(state)
    let statemap = {
        ...state,
        completeTodos: state.completeTodos.filter((todo, index) => index !== action.payload),
    };
    localStorage.setItem('completedTodos', JSON.stringify(statemap.completeTodos));
    return statemap;
}

// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
function todoReducer(state, action) {
    switch (action.type) {
        case 'SET_INIT_TODOS':
            return {
                ...state,
                allTodos: action.payload
            };
        case 'SET_INIT_COMP_TODOS':
            return {
                ...state,
                completeTodos: action.payload
            };
        case 'SET_TODOS':
            return setTodos(state, action);
        case 'SET_TODOS_COMPLETE':
            return setTodosComplete(state, action);
        case 'SET_COMP_TODOS':
            return setCompTodos(state, action);
        case 'DELETE_TODOS':
            return setDelTodos(state, action);
        case 'DELETE_COMP_TODOS':
            return setDelCompTodos(state, action);
        default:
            throw new Error(`Unhanded action type: ${action.type}`);

    }


}

// State 용 Context 와 Dispatch 용 Context 따로 만들어주기
const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);

// 위에서 선언한 두가지 Context 들의 Provider 로 감싸주는 컴포넌트
export function TodoReduceProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const { allTodos, completeTodos } = state;

    const value = useMemo(() => ({ allTodos, completeTodos }), [allTodos, completeTodos]);

    return (
        <TodoStateContext.Provider value={value}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

// State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useTodoState() {
    const state = useContext(TodoStateContext);
    if (!state) {
        throw new Error('Cannot find UsersProvider');
    }
    return state;
}

// Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export function useTodoDispatch() {
    const dispatch = useContext(TodoDispatchContext);
    if (!dispatch) {
        throw new Error('Cannot find UsersProvider');
    }
    return dispatch;
}