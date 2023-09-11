import "./App.css";
import { React, useEffect, useState } from "react";
import { useTodoState, useTodoDispatch } from "./context/TodoReduceContext";
import { TodoList } from "./components/TodoListComp";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const state = useTodoState();
  const dispatch = useTodoDispatch();

  //추가
  const handleAddTodo = () => {
    console.log("ddd");
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    dispatch({ type: "SET_TODOS", payload: newTodoItem });
  };
  //삭제
  const handleDeleteTodo = (index) => {
    dispatch({ type: "DELETE_TODOS", payload: index });
  };
  //삭제(완료한일)
  const handleDeleteCompleteTodo = (index) => {
    console.log(index);
    dispatch({ type: "DELETE_COMP_TODOS", payload: index });
  };
  //완료
  const handleComplete = (index) => {
    console.log(index);
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    let filteredItem = {
      ...state.allTodos[index],
      completedOn: completedOn,
    };
    dispatch({ type: "SET_COMP_TODOS", payload: filteredItem });

    handleDeleteTodo(index);
  };

  // 초기 데이터 로딩
  useEffect(
    () => {
      console.log("초기로딩");
      let savedTodo = JSON.parse(localStorage.getItem("todolist"));
      let savedCompletedTodo = JSON.parse(
        localStorage.getItem("completedTodos")
      );
      if (savedTodo) {
        dispatch({ type: "SET_INIT_TODOS", payload: savedTodo });
      }
      if (savedCompletedTodo) {
        dispatch({ type: "SET_INIT_COMP_TODOS", payload: savedCompletedTodo });
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="App">
      <h1>나의 할일</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="제목"
            ></input>
          </div>
          <div className="todo-input-item">
            <label>설명</label>
            <input
              type="text"
              placeholder="설명"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></input>
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              추가
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            type="button"
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            해야할일
          </button>
          <button
            type="button"
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            완료
          </button>
        </div>

        <TodoList
          isCompleteScreen={isCompleteScreen}
          handleDeleteTodo={handleDeleteTodo}
          handleComplete={handleComplete}
          handleDeleteCompleteTodo={handleDeleteCompleteTodo}
        ></TodoList>
      </div>
    </div>
  );
}

export default App;
