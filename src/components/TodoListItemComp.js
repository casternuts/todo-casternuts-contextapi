import { React, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCheckLg } from "react-icons/bs";



const isCompleteScreenRender = (index, isCompleteScreen, handleDeleteTodo, handleComplete, handleDeleteCompleteTodo) => {
    if (isCompleteScreen) {

        return (
            <div className='icon-area'>
                <AiOutlineDelete className='icon' title="delete" onClick={() => handleDeleteCompleteTodo(index)}></AiOutlineDelete>
            </div>
        );
    } else {

        return (
            <div className='icon-area'>
                <AiOutlineDelete className='icon' title="delete" onClick={() => handleDeleteTodo(index)}></AiOutlineDelete>
                <BsCheckLg className='check-icon' title="complete" onClick={() => handleComplete(index)}></BsCheckLg>
            </div>
        );
    }

}

export const TodoListItem = ({ isCompleteScreen, item, index, handleDeleteTodo, handleComplete, handleDeleteCompleteTodo }) => {


    return (
        <div className='todo-list-item' key={index}>
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {
                    isCompleteScreen ? <p>완료일:{item.completedOn}</p> : null
                }

            </div>
            {isCompleteScreenRender(index, isCompleteScreen, handleDeleteTodo, handleComplete, handleDeleteCompleteTodo)}
        </div>

    )
}