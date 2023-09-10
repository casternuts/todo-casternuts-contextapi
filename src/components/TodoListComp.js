import { React, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCheckLg } from "react-icons/bs";
import { useTodoState, useTodoDispatch } from '../context/TodoReduceContext';
import { TodoListItem } from './TodoListItemComp'


export const TodoList = ({ isCompleteScreen, handleDeleteTodo, handleComplete, handleDeleteCompleteTodo }) => {
    const state = useTodoState();
    const dispatch = useTodoDispatch();


    return (
        <div className='todo-list'>
            {/* 모든 할 일들 */}
            {isCompleteScreen === false && state.allTodos.map((item, index) => (

                <TodoListItem
                    key={index}
                    isCompleteScreen={isCompleteScreen}
                    item={item}
                    index={index}
                    handleDeleteTodo={handleDeleteTodo}
                    handleDeleteCompleteTodo={handleDeleteCompleteTodo}
                    handleComplete={handleComplete}
                ></TodoListItem>
            ))}
            {/* 완료 한 일들 */}
            {isCompleteScreen === true && state.completeTodos.map((item, index) => (

                <TodoListItem
                    key={index}
                    isCompleteScreen={isCompleteScreen}
                    item={item}
                    index={index}
                    handleDeleteTodo={handleDeleteTodo}
                    handleDeleteCompleteTodo={handleDeleteCompleteTodo}
                    handleComplete={handleComplete}
                ></TodoListItem>
            ))}
        </div>

    )
}