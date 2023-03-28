import { useEffect, useState } from "react";

function Home() {

    const [boards, setBoards] = useState(() => {
        if(localStorage.boards === undefined) {
            return [];
        } else {
            return JSON.parse(localStorage.getItem('boards'))
        }
    });
    const [favourites, setFavourites] = useState([]);
    const [recents, setRecents] = useState([]);
    const [boardName, setBoardName] = useState('');
    const [boardBackground, setBoardBackground] = useState('');

    useEffect(() => {
        if(localStorage.boards === undefined || localStorage.favourites === undefined || localStorage.recents === undefined) {
            localStorage.setItem('boards', '')
            localStorage.setItem('favourites', '')
            localStorage.setItem('recents', '')
        }
    
    })    

    useEffect(() => {
        console.log(boards)
    }, [boards])

    const gradients = [{
        GradeGrey: {color1: '#bdc3c7', color2: '#2c3e50'}
    }];

    const createBoard = () => {
        const board = {
            name: 'PHP',
            background: gradients[0].GradeGrey, //put colour in classname :)
            lists: []
        }

        if(localStorage.getItem('boards') === '') {
            localStorage.setItem('boards', `[${JSON.stringify(board)}]`)
            setBoards([board])
        } else {
            const tempStorage = JSON.parse(localStorage.getItem('boards'))
            tempStorage.push(board)
            localStorage.setItem('boards', JSON.stringify(tempStorage))
            setBoards((prevState) => [...prevState, board])
        }
    }

    return (
        <div className="homepage">
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

                </div>
                <div className="homepage-body__content">
                    <div className="starred-boards">

                    </div>
                    <div className="recent-boards">

                    </div>
                    <div className="boards">

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;