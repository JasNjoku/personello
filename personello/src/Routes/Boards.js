import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import List from "../Components/List";


function Boards() {
    const { id } = useParams();
    let board = JSON.parse(localStorage.getItem('boards')).find((x) => x.name === id);
    const [listTitle, setListTitle] = useState('')
    const [list, setList] = useState([]);

    useEffect(() => {
        const listItems = JSON.parse(localStorage.getItem('boards')).find((x) => x.name === id).lists;
        setList(listItems);
    }, [id])

    useEffect(() => {
        JSON.parse(localStorage.getItem('boards')).forEach(board => {
            if (board.name === id) {
                if (localStorage.recents === undefined || localStorage.getItem('recents') === '' || localStorage.getItem('recents') === '[]') {
                    localStorage.setItem('recents', `[${JSON.stringify(board)}]`)
                }
                else {
                    let alreadyInRecents = false;
                    if (alreadyInRecents === false) {
                        JSON.parse(localStorage.getItem('recents')).forEach((b, index) => {
                            if (b.name.toLowerCase() === board.name.toLowerCase()) {
                                const temp = JSON.parse(localStorage.getItem('recents'));
                                temp.splice(index, 1)
                                temp.unshift(b)
                                localStorage.setItem('recents', `${JSON.stringify(temp)}`)
                                alreadyInRecents = true;
                            }
                        })
                    }

                    if (JSON.parse(localStorage.getItem('recents')).length < 6 && alreadyInRecents === false) {
                        const temp = JSON.parse(localStorage.getItem('recents'));
                        temp.unshift(board)
                        localStorage.setItem('recents', `${JSON.stringify(temp)}`)
                    }

                    if (JSON.parse(localStorage.getItem('recents')).length === 6) {
                        const temp = JSON.parse(localStorage.getItem('recents'));
                        temp.pop();
                        localStorage.setItem('recents', `${JSON.stringify(temp)}`)
                    }

                }
            }
        })
    }, [id])

    const addListTitle = () => {
        if(listTitle.length < 3) {
            alert('List title should be longer than 3 characters')
            return;
        }

        const newList = {
            listName: listTitle,
            listCards: []
        }
        board.lists.push(newList);
        const allBoards = JSON.parse(localStorage.getItem('boards'));

        allBoards.forEach((element, index) => {
            if (element.name === board.name) {
                allBoards.splice(index, 1, board)
            }
        })

        localStorage.setItem('boards', `${JSON.stringify(allBoards)}`)
        setList([...list, newList]);
    }

    const deleteList = (i) => {
       
        const allBoards = JSON.parse(localStorage.getItem('boards'));

        allBoards.forEach((element, index) => {
            if (element.name === board.name) {
                
            }
        })
    }


    return (
        <div className={`board-container ${board.background}`}>
            <nav className={`homepage-nav ${board.background}`}>
                <div className="homepage-nav__left">
                    <Link to={'/'}><h2>Personello</h2></Link>
                </div>
                <div className="homepage-nav__right">
                    
                </div>
            </nav>
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

                            {list.map((list, index) =>
                                <List 
                                    board={board} 
                                    key={index} 
                                    name={list.listName} 
                                    listId={index} 
                                    deleteFromList={deleteList}
                                />
                            )}
                        </div>
                        <div className={`add-list-container`}>
                            <div className={`add-list-container__function`}>
                                <input onChange={(e) => { setListTitle(e.target.value) }} placeholder="Enter list title" />
                            </div>
                            <button onClick={addListTitle}>Add to list</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </main>
            </div>
            
        </div>
    )
}

export default Boards;