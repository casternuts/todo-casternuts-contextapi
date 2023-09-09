
import './App.css';
import { React, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  return (
    <div className="App">
      <h1>나의 할일</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" placeholder="제목"></input>
          </div>
          <div className="todo-input-item">
            <label>설명</label>
            <input type="text" placeholder="설명"></input>
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn">추가</button>
          </div>
        </div>

        <div className="btn-area">
          <button type="button" className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>해야할일</button>
          <button type="button" className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>완료</button>
        </div>
        <div className='todo-list'>
          <div className='todo-list-item'>
            <div>
              <h3>할일 1</h3>
              <p>설명들</p>
            </div>
            <div>
              <AiOutlineDelete className='icon'></AiOutlineDelete>
              {/* <BsCheckLg className='check-icon'></BsCheckLg> */}

            </div>

          </div>
        </div>

      </div>


    </div>
  );
}

export default App;
