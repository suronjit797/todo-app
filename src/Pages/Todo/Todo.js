import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import axios from 'axios'

const Todo = () => {
    const [todo, setTodo] = useState({
        message: '',
        isDone: false
    })
    const [todoList, setTodoList] = useState([])


    // get todo list
    useEffect(() => {
        axios.get('http://localhost:5000/todo')
            .then(res => setTodoList(res.data.todo))
    }, [])

    // add new todo
    const handelTodo = event => {
        event.preventDefault()
        setTodo({ ...todo, message: '' })
        axios.post('http://localhost:5000/todo', { todo })
            .then(res => {
                setTodoList(res.data.todo)
            })
    }

    // delete a todo from list
    const handelRemoveTodo = id => {
        const conformation = window.confirm('Are you sure want to remove?')
        if (conformation) {
            axios.delete(`http://localhost:5000/todo/${id}`)
                .then(res => {
                    setTodoList(res.data.todo)
                })
        }
    }
    const handelDone = id => {
        const conformation = window.confirm('Are you sure your work is done?')
        const updateTodo = todoList.find(item => item._id === id)
        updateTodo.isDone = true
        if (conformation) {
            axios.put(`http://localhost:5000/todo/${id}`, {updateTodo})
                .then(res => setTodoList(res.data.todo))
        }
    }
    return (
        <div>
            <TodoForm todo={todo} setTodo={setTodo} handelTodo={handelTodo} />
            <div className="mt-3">
                {
                    !todoList.length && <b className='text-danger'> No data found </b>
                }
                <ul className={`list-group bg-secondary text-white ${todoList.length && 'p-4'}`}>

                    {
                        todoList && todoList.map((item, ind) => (
                            <li
                                className={`list-group-item text-capitalize d-flex align-items-center ${item.isDone && "text-decoration-line-through text-muted"}`}
                                key={item._id}
                            >
                                <b> {ind + 1}.  {item.message} </b>
                                <div className="ms-auto">
                                    <button
                                        className='btn btn-success'
                                        onClick={() => handelDone(item._id)}
                                    > Done </button>
                                    <button
                                        className='ms-2 btn btn-danger'
                                        onClick={() => handelRemoveTodo(item._id)}
                                    > X </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default Todo;