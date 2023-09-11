import { useEffect, useState } from "react";
import { updateLocalStorage } from "../config/updateLS";
import { Todo } from "../Classes/Classes";
import { v4 as uuid } from "uuid"
import TodoItem from "./TodoItem";

const ListCard = (props) => {
    const [card, setCard] = useState(props.card)

    const [desc, setDesc] = useState(() => {
        return card.description
    })
    const [newDesc, setNewDesc] = useState('');

    const [todos, setTodos] = useState(() => {
        return card.todos
    })
    const [percentage, setPercentage] = useState(0)

    const [todoTitle, setTodoTitle] = useState('')

    useEffect(() => {
        let p = 0;

        todos.forEach(todo => {
            if (todo.completed) {
                p++;
            }
        })

        if (todos.length === 0) {
            setPercentage(0)
            return;
        }

        setPercentage(Math.trunc((p / todos.length) * 100))
    }, [todos])


    const updateCard = () => {
        let currentBoard = JSON.parse(localStorage.getItem('boards')).find(board => board.id === props.boardId)
        currentBoard.lists.find(l => l.id === props.listId).listCards.find(c => c.id === card.id).description = newDesc

        updateLocalStorage(currentBoard, 'boards')
        updateLocalStorage(currentBoard, 'recents')
        updateLocalStorage(currentBoard, 'favourites')
    }

    const updateTodo = (todo) => {
        let currentBoard = JSON.parse(localStorage.getItem('boards')).find(board => board.id === props.boardId)
        currentBoard.lists.find(l => l.id === props.listId).listCards.find(c => c.id === card.id).todos.push(todo)

        updateLocalStorage(currentBoard, 'boards')
        updateLocalStorage(currentBoard, 'recents')
        updateLocalStorage(currentBoard, 'favourites')
    }

    const complete = (todo, shouldComplete) => {

        let currentBoard = JSON.parse(localStorage.getItem('boards')).find(board => board.id === props.boardId)
        let currentTodo = currentBoard.lists.find(l => l.id === props.listId).listCards.find(c => c.id === card.id).todos.find(t => t.id === todo)
        currentTodo.completed = shouldComplete

        todos.forEach((element, index) => {
            if (element.id === todo) {
                let newArr = todos.toSpliced(index, 1, currentTodo)
                setTodos(newArr)
            }
        })

        updateLocalStorage(currentBoard, 'boards')
        updateLocalStorage(currentBoard, 'recents')
        updateLocalStorage(currentBoard, 'favourites')
    }

    const addNewDesc = (e) => {
        if (e.keyCode !== 13) {
            return;
        }

        setDesc(newDesc)
        updateCard()

        document.getElementById(card.id).querySelector('.edit-description-content').style.display = 'none';
    }

    const editDesc = (e) => {
        e.target.parentElement.parentElement.querySelector('.edit-description-content').style.display = 'block';
    }

    const save = (e) => {
        setDesc(newDesc)

        updateCard()

        e.target.parentElement.parentElement.style.display = 'none';
    }

    const cancel = (e) => {
        e.target.parentElement.parentElement.style.display = 'none';
    }

    const close = (e) => {
        if (e.target.className !== 'edit-card-modal') {
            return;
        }
        document.getElementById(card.id).style.display = 'none';
    }

    const showCardModal = () => {
        document.getElementById(card.id).style.display = 'flex';
    }

    const addNewTodo = () => {
        if (todoTitle.length < 1) {
            return;
        }

        let newTodo = new Todo(uuid(), todoTitle)

        setTodos(prevState => [...prevState, newTodo])
        updateTodo(newTodo)
    }

    return (
        <div className="card-container">
            <div className="card" onClick={showCardModal}>
                <p>{card.name}</p>
            </div>

            <div className={`edit-card-modal`} id={card.id} onClick={close}>
                <div className="edit-card-modal__box">
                    <div className="card-modal__title">
                        <h2>{card.name}</h2>
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
                                <div style={{ width: `${percentage}%` }} className="indicator"></div>
                            </div>
                        </div>
                        <div className="todo-items">
                            {todos.map(todo => <TodoItem todo={todo} key={todo.id} complete={complete} />)}

                            <div className="create-new-todo">
                                <textarea onChange={(e) => { setTodoTitle(e.target.value) }} placeholder="Add an item"></textarea>
                                <div className="create-new-todo__buttons">
                                    <button onClick={addNewTodo}>Add</button>
                                    <button onClick={(e) => {
                                        document.getElementById(card.id).querySelector('.open-create-new-todo').style.display = 'block';
                                        e.target.parentElement.parentElement.style.display = 'none';
                                    }}>Cancel</button>
                                </div>
                            </div>
                            <button className="open-create-new-todo" onClick={(e) => {
                                document.getElementById(card.id).querySelector('.create-new-todo').style.display = 'block';
                                e.target.style.display = 'none'
                            }
                            }>
                                Add An item
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ListCard;