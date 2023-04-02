import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { useParams } from "react-router-dom";

function CardModal(props) {

    //move all this to list when finished
    const { id } = useParams();
    let board = JSON.parse(localStorage.getItem('boards')).find((x) => x.name === id);

    const [desc, setDesc] = useState(board.lists[props.listID].listCards[props.card.id - 1].description)
    const [newDesc, setNewDesc] = useState('');

    const [todos, setTodos] = useState(board.lists[props.listID].listCards[props.card.id - 1].todos)
    const [percentage, setPercentage] = useState(0)
    // const [newTodos, setNewTodos] = useState([]);
    const [todoTitle, setTodoTitle] = useState('')

    useEffect(() => {
        let p = 0;

        todos.forEach(todo => {
            if(todo.checked) {
                p++;
            }
        })

        if(todos.length === 0) {
            setPercentage(0)
            return;
        }

        setPercentage(Math.trunc((p / todos.length) * 100))
    }, [todos])

    const addNewDesc = (e) => {

        if (e.keyCode !== 13) {
            return;
        }

        setDesc(newDesc)
        props.addCardDesc(props.card.id, newDesc);
        document.querySelector('.edit-description-content').style.display = 'none';
    }

    const save = () => {
        setDesc(newDesc)
        props.addCardDesc(props.card.id, newDesc)
        document.querySelector('.edit-description-content').style.display = 'none';
    }

    const addNewTodo = (e) => {
        if (todoTitle.length < 1) {
            return;
        }

        const newTodo = { checked: false, name: todoTitle };

        props.addCardTodo(props.card.id, newTodo)
        setTodos(prevState => {return([...prevState, newTodo])})

        //so sorry
        window.location.reload();


        //duplicatiing because of an error
        let p = 0;

        todos.forEach(todo => {
            if(todo.checked) {
                p++;
            }
        })

        if(todos.length === 0) {
            setPercentage(0)
            return;
        }

        setPercentage(Math.trunc((p / todos.length) * 100))
    }

    const editDesc = (e) => {
        e.target.parentElement.parentElement.querySelector('.edit-description-content').style.display = 'block';
    }

    const cancel = (e) => {
        e.target.parentElement.parentElement.style.display = 'none';
    }

    const checkItem = (todoID, shouldCheck) => {
        board.lists[props.listID].listCards[props.card.id - 1].todos[todoID].checked = shouldCheck;
        const allBoards = JSON.parse(localStorage.getItem('boards'));
        allBoards.forEach((element, index) => {
            if (element.name === board.name) {
                allBoards.splice(index, 1, board)
            }
        })

        localStorage.setItem('boards', `${JSON.stringify(allBoards)}`)
        setTodos(board.lists[props.listID].listCards[props.card.id - 1].todos)

        let p = 0;

        todos.forEach(todo => {
            if(todo.checked) {
                p++;
            }
        })

        if(todos.length === 0) {
            setPercentage(0)
            return;
        }

        setPercentage(Math.trunc((p / todos.length) * 100))
    }

    const close = (e) => {
        if (e.target.className !== 'edit-card-modal') {
            return;
        }
        document.querySelector('.edit-card-modal').style.display = 'none';
        props.handleModal();
    }
    return (
        <div className="edit-card-modal" onClick={close}>
            <div className="edit-card-modal__box">
                <div className="card-modal__title">
                    <h2>{props.card.name}</h2>
                </div>
                <div className="card-modal__description">
                    <div className="description-header">
                        <h3>Description</h3>
                        <button onClick={editDesc}>Edit</button>
                    </div>
                    <div className="description-content">
                        <p>{desc}</p>
                        <div className="edit-description-content">
                            <textarea
                                defaultValue={desc}
                                onChange={(e) => { setNewDesc(e.target.value) }}
                                onKeyDown={addNewDesc}
                            ></textarea>
                            <div className="edit-description-content__buttons">
                                <button onClick={save}>Save</button>
                                <button onClick={cancel}>Cancel</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="card-modal__todo">
                    <h3>Todo</h3>
                    <div className="todo-percentage">
                        <p>{percentage}%</p>
                        <div className="todo-percentage__bar">
                            <div style={{width: `${percentage}%`}} className="indicator"></div>
                        </div>
                    </div>
                    <div className="todo-items">
                        {todos.map((todoItem, index) => 
                            <TodoItem 
                                key={index} 
                                todo={todoItem} 
                                listID={props.listID} 
                                cardID={props.card.id - 1}
                                todoID={index}
                                check={checkItem}
                            />
                        )}
                        <div className="create-new-todo">
                            <textarea onChange={(e) => { setTodoTitle(e.target.value) }} placeholder="Add an item"></textarea>
                            <div className="create-new-todo__buttons">
                                <button onClick={addNewTodo}>Add</button>
                                <button onClick={(e) => {
                                    document.querySelector('.open-create-new-todo').style.display = 'block';
                                    e.target.parentElement.parentElement.style.display = 'none';
                                }}>Cancel</button>
                            </div>
                        </div>
                        <button className="open-create-new-todo" onClick={(e) => 
                            {
                                document.querySelector('.create-new-todo').style.display = 'block';
                                e.target.style.display = 'none'
                            }
                            }>
                        Add An item</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardModal;