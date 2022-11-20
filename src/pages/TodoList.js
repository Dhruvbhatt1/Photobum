import React, { useState, useEffect } from "react";
import TodoForm from './TodoForm';
import Todo from './Todo';
import { updateProfile, getAuth } from "firebase/auth";
import { ref, getDatabase, child, push, update, set, remove, get } from "firebase/database";
import Tabs from "./tabs";


function TodoList() {

    const [todos, setTodos] = useState([]);
    const [didFetch, setFetch] = useState(false);
    const [selectedTab, setSelectedTab] = useState("Active");
    const auth = getAuth();
    const user = auth.currentUser;
    const labels = ["Active", "Completed"];

    const onSelect = (tab) => {
        setSelectedTab(tab);
    }

    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)){
            return;
        }
        writeData(todo);
        const newTodos = [todo, ...todos];

        setTodos(newTodos);
        console.log(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return;
        }
        newValue.id = todoId
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
        updateData(newValue)
    };

    const removeTodo = id =>{
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr)
        removeData(id)
    };


    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete;
                updateData(todo)
            }
            return todo;
        });
        setTodos(updatedTodos);
    }
    const writeData = (todo) => {
        const db = getDatabase();   
      
        return set(ref(db, "User/"+user.uid+"/Todos/"+todo.id), {
            id: todo.id,
            text: todo.text,
            isComplete: todo.isComplete,
        });
    }
    const updateData = (todo) => {
        const db = getDatabase();   
      
        return update(ref(db, "User/"+user.uid+"/Todos/"+todo.id), {
          id: todo.id,
          text: todo.text,
          isComplete: todo.isComplete,
        });
    }
    const removeData = (id) => {
        const db = getDatabase();
        remove(ref(db, "User/"+user.uid+"/Todos/"+id))
    }
    const getData = async () => {
        const db = getDatabase();   
      
        await get(child(ref(db), `User/${user.uid}/Todos/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const todos = Object.values(snapshot.val()).map((todo) => {
                    return ({
                        id: todo.id,
                        text: todo.text,
                        isComplete: todo.isComplete,
                    })
                })
                setTodos(todos)
                console.log(todos)
            }
        })
    }
    if(didFetch == false){
        setFetch(true)
        getData()
    }
    const activeTodos = todos.filter(todo => todo.isComplete == false)
    const completedTodos = todos.filter(todo => todo.isComplete == true)
  return (
    <div className='todo-body'>
        <h1>What is the plan for today???</h1>
        <TodoForm onSubmit={addTodo}/>
        <div className="tabs-container">
          <Tabs labels={labels} selectedLabel={selectedTab} onSelect={onSelect} classname={"todo-tabs"}/>
        </div>        
        <div className='todo-container'>
            {selectedTab == labels[0] ? (
                <Todo 
                    todos={activeTodos} 
                    completeTodo = {completeTodo} 
                    removeTodo = {removeTodo} 
                    updateTodo= {updateTodo}
                />
            ) : (
                <Todo 
                    todos={completedTodos} 
                    completeTodo = {completeTodo} 
                    removeTodo = {removeTodo} 
                    updateTodo= {updateTodo}
                />
            )}
        </div>
    </div>
  );
}

export default TodoList; 