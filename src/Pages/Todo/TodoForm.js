import React from 'react';

const TodoForm = ({ todo, handelTodo, setTodo }) => {
    const {message} = todo

    const handelTodoMsg = event => {
        const msg= event.target.value
        setTodo({...todo, message:msg})
    }
    return (
        <form className='d-flex ' onSubmit={handelTodo}  >
            <input
                type="text"
                name="todo"
                className='w-75 rounded-0 form-control'
                id="todo"
                placeholder='Create your todo'
                value={message}
                onChange={handelTodoMsg}
                required
            />
            <button type="submit" className='py-3 w-25 btn btn-success rounded-0'> Add new </button>
        </form>
    );
};

export default TodoForm;