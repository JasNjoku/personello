import { useEffect, useState } from "react";
import { Link, Navigate as Redirect } from "react-router-dom";
import IndividualBoard from "../Components/Board";
import { AiOutlineStar } from 'react-icons/ai'

function Home() {

    const [boards, setBoards] = useState(() => {
        if (localStorage.boards === undefined || localStorage.boards === '' || localStorage.boards === '[]') {
            return [];
        } else {
            return JSON.parse(localStorage.getItem('boards'))
        }
    });
    const [favourites, setFavourites] = useState(() => {
        if (localStorage.favourites === undefined || localStorage.favourites === '' || localStorage.favourites === '[]') {
            return [];
        } else {
            return JSON.parse(localStorage.getItem('favourites'))
        }
    });
    const [recents] = useState(() => {
        if (localStorage.recents === undefined || localStorage.recents === '' || localStorage.recents === '[]') {
            return [];
        } else {
            return JSON.parse(localStorage.getItem('recents'))
        }
    });

    const [boardName, setBoardName] = useState('');
    const [boardBackground, setBoardBackground] = useState('gradeGrey');
    const [createModal, setCreateModal] = useState(false);
    const [canCreate, setCanCreate] = useState(false);
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if (localStorage.boards === undefined || localStorage.favourites === undefined || localStorage.recents === undefined) {
            localStorage.setItem('boards', '')
            localStorage.setItem('favourites', '')
            localStorage.setItem('recents', '')
        }

    })

    //CLOSE MODAL LOGIC//]
    // document.addEventListener('click', (e) => {
    //     if (e.target !== document.querySelector('.create-board')) {
    //         if (e.target !== document.querySelector('.create-modal')) {
    //             // setCreateModal(false);
    //             console.log('not modal')
    //         } else {
    //             document.querySelector('.create-modal').childNodes.forEach((child) => {
    //                 if(child === )
    //             })
    //         }
    //     }
    // })


    const gradients = [
        {
            GradeGrey: { className: 'gradeGrey' },
            PiggyPink: { className: 'piggyPink' },
            CoolBlues: { className: 'coolBlues' },
            Harvey: { className: 'harvey' },
        }];


    const setBoardColor = (e) => {
        setBoardBackground(e.target.className);
    }

    const boardExists = (arr, name) => {
        if (arr.find((board) => {return board.name.toLowerCase() === name.toLowerCase()})) {
            return true
        }
    }

    const setBoardTitle = (e) => {
        const { value } = e.target;
        if (value.length < 3) {
            setCanCreate(false)
            return;
        } else {
            if (boards.length >= 1) {
                if (boardExists(boards, value)) {
                    setCanCreate(false)
                    return;
                }
            }
        }

        setBoardName(value);
        setCanCreate(true);

    }

    const showModal = () => {
        setCreateModal(true)
    }

    // const shouldSpliceFavourite = (arr, name) =>{
    //     let x = {splice: false, index: 0};
    //     arr.forEach((board, index) => {
    //         if(board.name.toLowerCase() === name.toLowerCase()) {
    //             x.splice = true;
    //             x.index = index;
    //         }
    //     })

    //     return x;
    // }

    const addToFavourites = (e) => {
        const { value } = e.currentTarget;

    }

    const createBoard = () => {

        const board = {
            name: boardName,
            background: boardBackground,
            lists: []
        }

        if (localStorage.getItem('boards') === '') {
            localStorage.setItem('boards', `[${JSON.stringify(board)}]`)
            setBoards([board])
        } else {
            const tempStorage = JSON.parse(localStorage.getItem('boards'))
            tempStorage.push(board)
            localStorage.setItem('boards', JSON.stringify(tempStorage))
            setBoards((prevState) => [...prevState, board])
        }
        setRedirect(true);

    }

    return (
        <div className="homepage">
            {redirect ? <Redirect to={`/boards/${boardName}`}></Redirect> : null}
            <nav className="homepage-nav">
                <div className="homepage-nav__left">
                    <h2>Personello</h2>
                    <button id="create" onClick={createBoard}>Create</button>
                </div>
                <div className="homepage-nav__right">
                    <div className="nav-search">
                        <input placeholder="🔎︎ Search" />
                    </div>
                </div>
            </nav>
            <main className="homepage-body">
                <div className="homepage-body__side">
                    <div className="side-content">
                        <Link to={'/'}>Boards</Link>
                        <Link to={'/'}>About</Link>
                    </div>
                </div>
                <div className="homepage-body__content">
                    {/* <div className="starred-boards">
                        <h3>Starred boards</h3>
                        <div className="boards-content">
                            {boards.map((board) => <IndividualBoard key={board.name} board={board} />)}
                        </div>
                    </div> */}
                    <div className="recent-boards">
                        <h3>Recently viewed</h3>
                        <div className="boards-content">
                            {recents.map((board) => <IndividualBoard add={addToFavourites} key={board.name} board={board} />)}
                        </div>
                    </div>
                    <div className="boards">
                        <h3>Your boards</h3>
                        <div className="boards-content">
                            {boards.map((board) => <IndividualBoard add={addToFavourites} key={board.name} board={board} />)}
                            <div className="create-board" onClick={showModal}>
                                Create new board
                            </div>
                        </div>
                    </div>
                </div>
                {!createModal ? null : <div className="create-modal">
                    <header>Create board </header>
                    <div className={`preview ${boardBackground}`}>

                    </div>
                    <div className="backgrounds">
                        Background
                        <div className="backgrounds-colours">
                            {Object.keys(gradients[0]).map((key, index) =>
                                <div key={index} className={gradients[0][key].className} onClick={setBoardColor}>

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
                </div>}
            </main>
        </div>
    )
}

export default Home;