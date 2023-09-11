import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { List as ListClass } from "../Classes/Classes";

import { v4 as uuid } from "uuid";
import { updateLocalStorage as updateLS } from "../config/updateLS";
import List from "../Components/List";
const Board = () => {
    const { id } = useParams();
    const [board, setBoard] = useState(() => {
        return JSON.parse(localStorage.getItem('boards')).find(x => x.id === id);
    })

    const [lists, setLists] = useState(() => {
        return board.lists
    })

    const [newlistTitle, setNewListTitle] = useState('')

    useEffect(() => {
        let recents = JSON.parse(localStorage.getItem('recents'))
        let inRecents = false

        //incase recents array does not exist
        if (localStorage.recents === undefined || localStorage.getItem('recents') === '' || localStorage.getItem('recents') === '[]') {
            localStorage.setItem('recents', `[${JSON.stringify(board)}]`)
        } else {
            inRecents = recents.find(board => {
                if (board.id === id) {
                    //console.log(board, "Exists")
                    return true
                }
                return false
            })


            if (inRecents) {
                recents = recents.filter(board => board.id !== id)
                recents.unshift(board)
                updateLocalStorage(recents)
            }

            if (!inRecents) {
                if (recents.length < 6) {
                    recents.unshift(board)
                    updateLocalStorage(recents)
                }

                if (recents.length === 6) {
                    recents.pop();
                    updateLocalStorage(recents)
                }
            }


        }


    })

    const updateLocalStorage = (boards) => {
        localStorage.setItem('recents', `${JSON.stringify(boards)}`)
    }

    const addList = (e) => {
        e.preventDefault();
        let listTitle = e.target.querySelector('input').value

        if (listTitle.length < 1) {
            return;
        }

        let list = new ListClass(uuid(), listTitle)

        setLists(prevState => [...prevState, list])

        board.lists.push(list)
        updateLS(board, 'boards')
    }

//    let found =  JSON.parse(localStorage.getItem('boards')).find(e =>  e.id === board.id)

//    if (!found) {
//     return
//    }

    return (
        <div className={`board-container ${board.background}`}>
            <nav className={`homepage-nav ${board.background}`}>
                <div className="homepage-nav__left">
                    <Link to={'/'}><h2>Personello</h2></Link>
                </div>
                <div className="homepage-nav__right">

                </div>
            </nav>
            {/* show board name somewhere */}

            <div className="board-container__content">
                {/* <nav className="board-container__sidebar">
                    <h1>Me</h1>
                </nav> */}
                <main className="board-container__board">
                    {/* <nav className="board-container__innerNav">
                        INNER NAV
                    </nav> */}
                    <div className="board-container-board__items">
                        <div className="board__items">

                            {lists.map(list =>
                                <List boardId={id} list={list} key={list.id} />
                            )}
                        </div>
                        <div className={`add-list-container`}>

                            <form onSubmit={addList} className={`add-list-container__function`}>
                                <input placeholder="Enter list title..." />
                                <button type="submit">Add list</button>
                            </form>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Board;