import { useEffect, useState } from "react";

const TodoItem = (props) => {

    const [shouldStrike, setShouldStrike] = useState('none');

    useEffect(() => {
        if(props.todo.completed) {
            setShouldStrike('line-through')
        } else {
            setShouldStrike('none')
        }
    }, [])

    const handleInputClick = (e) => {
        if(e.target.checked) {
            setShouldStrike('line-through')
            props.complete(props.todo.id, true)
        } else {
            setShouldStrike('none')
            props.complete(props.todo.id, false)
        }
    }
    
    return (
        <div className="todo-item">
            <input type={'checkbox'} defaultChecked={props.todo.completed} onClick={handleInputClick}></input>
            <p style={{textDecoration: `${shouldStrike}`}}>{props.todo.name}</p>
        </div>
    )
}

export default TodoItem