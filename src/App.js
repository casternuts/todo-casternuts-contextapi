
import './App.css';
import { React, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCheckLg } from "react-icons/bs";
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completeTodos, setCompleteTodos] = useState([]);
  //추가
  const handleAddTodo = () => {
    console.log('ddd')
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }
    let updateTodoArr = [...allTodos]
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updateTodoArr));
  }
  //삭제
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    console.log(reducedTodo)
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };
  //삭제(완료한일)
  const handleDeleteCompleteTodo = (index) => {
    let reducedTodo = [...completeTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompleteTodos(reducedTodo);
  };
  //완료
  const handleComplete = (index) => {
    console.log(index)
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updateCompletedArr = [...completeTodos];
    updateCompletedArr.push(filteredItem);
    setCompleteTodos(updateCompletedArr)
    localStorage.setItem('completedTodos', JSON.stringify(updateCompletedArr));
    handleDeleteTodo(index)
  }

  // 초기 데이터 로딩
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompleteTodos(savedCompletedTodo);
    }
  }, [])


  return (
    <div className="App">
      <h1>나의 할일</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="제목"></input>
          </div>
          <div className="todo-input-item">
            <label>설명</label>
            <input type="text" placeholder="설명" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}></input>
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">추가</button>
          </div>
        </div>

        <div className="btn-area">
          <button type="button" className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>해야할일</button>
          <button type="button" className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>완료</button>
        </div>
        <div className='todo-list'>
          {/* 모든 할 일들 */}
          {isCompleteScreen === false && allTodos.map((item, index) => (

            <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className='icon-area'>
                <AiOutlineDelete className='icon' title="delete" onClick={() => handleDeleteTodo(index)}></AiOutlineDelete>
                <BsCheckLg className='check-icon' title="complete" onClick={() => handleComplete(index)}></BsCheckLg>
              </div>
            </div>
          ))}
          {/* 완료 한 일들 */}
          {isCompleteScreen === true && completeTodos.map((item, index) => (

            <div className='todo-list-item' key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>완료일:{item.completedOn}</p>
              </div>
              <div className='icon-area'>
                <AiOutlineDelete className='icon' title="delete" onClick={() => handleDeleteCompleteTodo(index)}></AiOutlineDelete>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default App;

