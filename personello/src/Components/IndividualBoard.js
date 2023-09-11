import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BoardContext } from "../Routes/Home";
import { useState, useContext, useEffect } from "react";
import { updateLocalStorage } from "../config/updateLS";


function IndividualBoard() {

    const { board, setFavourites } = useContext(BoardContext)
    const [boardStarred, setBoardStarred] = useState('');

    useEffect(() => {
        board.favourited ? setBoardStarred('starred-star') : setBoardStarred('')
    }, [board])

    useEffect(() => {
        document.querySelectorAll('.starred-star').forEach(el => {
            if (el.value === board.id) {
                if (JSON.parse(localStorage.getItem('favourites')).find((b) => b.id === board.id) === undefined) {
                    setBoardStarred('')
                }
            }
        })
    })

    const handleFavourites = (e) => {
        let faves = JSON.parse(localStorage.getItem('favourites'))
        let canUpdate = true

        faves.forEach((element, index) => {
            if (element.id === board.id) {
                canUpdate = false
                faves.splice(index, 1)
                localStorage.setItem('favourites', `${JSON.stringify(faves)}`)
                
                board.favourited = false
                updateLocalStorage(board, 'favourites')
                updateLocalStorage(board, 'recents')
                updateLocalStorage(board, 'boards')
            }
        })

        if (canUpdate) {
            faves.push(board)
            localStorage.setItem('favourites', `${JSON.stringify(faves)}`)

            board.favourited = true
            updateLocalStorage(board, 'favourites')
            updateLocalStorage(board, 'recents')
            updateLocalStorage(board, 'boards')
        }

        setFavourites(faves)
    }

    return (
        <div className={`individual-board ${board.background}`}>
            <Link key={board.id} to={`board/${board.id}`}>
                <div className={board.background}>
                    {board.name}
                </div>
            </Link>
            <button onClick={handleFavourites} className={`outline-star ${boardStarred}`} value={board.id}>
                {boardStarred === 'starred-star' ? <AiFillStar /> : <AiOutlineStar />}
            </button>
        </div>
    )
}

export default IndividualBoard;