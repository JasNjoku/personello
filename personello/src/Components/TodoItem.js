import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function TodoItem(props) {

    const { id } = useParams();
    let board = JSON.parse(localStorage.getItem('boards')).find((x) => x.name === id);

    const [shouldStrike, setShouldStrike] = useState('none');

    useEffect(() => {
        if(board.lists[props.listID].listCards[props.cardID].todos[props.todoID].checked) {
            setShouldStrike('line-through')
        } else {
            setShouldStrike('none')
        }
    }, [])

    const handleInputClick = (e) => {
        if(e.target.checked) {
            setShouldStrike('line-through')
            // board.lists[props.listID].listCards[props.cardID].todos[props.todoID].checked = true
            props.check(props.todoID, true)
        } else {
            setShouldStrike('none')
            // board.lists[props.listID].listCards[props.cardID].todos[props.todoID].checked = false
            props.check(props.todoID, false)
        }
    }
    
    return (
        <div className="todo-item">
            <input type={'checkbox'} defaultChecked={props.todo.checked} onClick={handleInputClick}></input>
            <p style={{textDecoration: `${shouldStrike}`}}>{props.todo.name}</p>
        </div>
    )
}

export default TodoItem;