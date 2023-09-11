import { useState, useEffect, createContext } from "react"
import { Link, Navigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Board } from "../Classes/Classes";
import IndividualBoard from "../Components/IndividualBoard";

export const BoardContext = createContext();

const Home = () => {
    const [boards, setBoards] = useState(() => {
        if (!localStorage.boards) return [];

        return JSON.parse(localStorage.getItem('boards'))
    });

    const [recents, setRecents] = useState(() => {
        if (localStorage.recents === undefined || localStorage.recents === '' || localStorage.recents === '[]') {
            localStorage.setItem('recents', '[]')
            return [];
        } else {
            return JSON.parse(localStorage.getItem('recents'))
        }
    });

    const [favourites, setFavourites] = useState(() => {
        if (localStorage.favourites === undefined || localStorage.favourites === '' || localStorage.favourites === '[]') {
            localStorage.setItem('favourites', '[]')
            return [];
        } else {
            return JSON.parse(localStorage.getItem('favourites'))
        }

    })

    const [redirect, setRedirect] = useState(false)
    const [currentBoardId, setCurrentBoardId] = useState('')

    const [boardName, setBoardName] = useState('');
    const [boardBackground, setBoardBackground] = useState('gradeGrey');
    const [createModal, setCreateModal] = useState(false);
    const [canCreate, setCanCreate] = useState(false);

    const setBoardColor = (e) => {
        setBoardBackground(e.target.className);
    }

    const setBoardTitle = (e) => {
        const { value } = e.target;
        if (value.length < 1) {
            setCanCreate(false)
            return;
        }

        setBoardName(value);
        setCanCreate(true);
    }

    const showModal = () => {
        setCreateModal(true)
    }

    const closeModal = (e) => {
        if (e.target.className !== 'create-modal-bg') {
            return;
        }
        setCreateModal(false)
    }

    useEffect(() => {
        if (localStorage.boards === undefined || localStorage.recents === undefined) {
            localStorage.setItem('boards', '[]')
            localStorage.setItem('recents', '[]')
            localStorage.setItem('favourites', '[]')
        }
    })

    useEffect(() => {
        if (favourites.length > 0) {
            setBoards(JSON.parse(localStorage.getItem('boards')))
            setRecents(JSON.parse(localStorage.getItem('recents')))
        }
    }, [favourites])

    const gradients = [{
        CoolBlues: { className: 'coolBlues' },
        PiggyPink: { className: 'piggyPink' },
        LightOrange: { className: 'lightOrange' },
        DeepPurple: { className: 'deepPurple' },
    }];

    const createBoard = (e) => {
        e.preventDefault();

        const board = new Board(uuid(), boardName, boardBackground);
        updateLocalStorage(board)
        setBoards(prevState => [...prevState, board])

        setCurrentBoardId(board.id)
        setRedirect(true)
    }

    const updateLocalStorage = (board) => {
        const localStorageArr = JSON.parse(localStorage.getItem('boards'));
        localStorageArr.push(board);
        localStorage.setItem('boards', JSON.stringify(localStorageArr))
    }


    return (
        <div className="homepage">
            {redirect ? <Navigate to={`/board/${currentBoardId}`}></Navigate> : null}
            <nav className="homepage-nav">
                <div className="homepage-nav__left">
                    <Link to={'/'}><h2>Personello</h2></Link>
                </div>
                <div className="homepage-nav__right">

                    <button id="create" onClick={showModal}>Create</button>
                </div>
            </nav>
            <main className="homepage-body">
                <div className="homepage-body__side">
                    <div className="side-content">
                        <Link to={'/'}>Boards</Link>
                    </div>
                </div>
                <div className="homepage-body__content">
                    {

                        favourites.length > 0 ?
                            <div className="starred-boards">
                                <h3>Starred boards</h3>
                                <div className="boards-content">
                                    {
                                        favourites.map(board =>
                                            <BoardContext.Provider value={{ board, setFavourites }} key={board.id}>
                                                <IndividualBoard />
                                            </BoardContext.Provider>
                                        )
                                    }
                                </div>
                            </div> : null
                    }

                    <div className="recent-boards">
                        <h3>Recently viewed</h3>
                        <div className="boards-content">
                            {recents.map(board =>
                                <BoardContext.Provider value={{ board, setFavourites }} key={board.id}>
                                    <IndividualBoard />
                                </BoardContext.Provider>)}
                        </div>
                    </div>

                    <div className="boards">
                        <h3>Your boards</h3>
                        <div className="boards-content">
                            {boards.map(board =>
                                <BoardContext.Provider value={{ board, setFavourites }} key={board.id}>
                                    <IndividualBoard />
                                </BoardContext.Provider>
                            )}
                            <div className="create-board" onClick={showModal}>
                                Create new board
                            </div>
                        </div>
                    </div>
                </div>
                {!createModal ? null :

                    <div className="create-modal-bg" onClick={closeModal}>
                        <div className="create-modal">
                            <header>Create board </header>
                            <div className={`preview ${boardBackground}`}>

                            </div>
                            <div className="backgrounds">
                                Background
                                <div className="backgrounds-colours">
                                    {Object.keys(gradients[0]).map((key) =>
                                        <div key={gradients[0][key].className} className={gradients[0][key].className} onClick={setBoardColor}>

                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="board-title__input">
                                <div>Board Title<span style={{ color: 'red' }}>*</span></div>
                                <input onChange={setBoardTitle} />
                                <div>👋Board title is required</div>
                            </div>
                            <div className="board-submit">
                                <button disabled={!canCreate} onClick={createBoard}>Create Board</button>
                            </div>
                        </div>
                    </div>
                }
            </main>
        </div>
    )

}

export default Home;