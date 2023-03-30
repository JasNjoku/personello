import { Link } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";



function IndividualBoard(props) {
    const [boardStarred, setBoardStarred] = useState('');

    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem('favourites'));
        if (favourites.find((board) => board.name.toLowerCase() === props.board.name.toLowerCase()) !== undefined) {
            setBoardStarred('starred-star')
        }
    }, [props])

    useEffect(() => {
        document.querySelectorAll('.starred-star').forEach(el => {
            if (el.value === props.board.name) {
                if (JSON.parse(localStorage.getItem('favourites')).find((board) => board.name.toLowerCase() === props.board.name.toLowerCase()) === undefined) {
                    setBoardStarred('')
                }

            }
        })
    })

    const handleFavourites = (e) => {
        props.add(e);
    }

    return (
        <div className="individual-board">
            <Link key={props.board.name} to={`boards/${props.board.name}`}>
                <div className={props.board.background}>
                    {props.board.name}

                </div>
            </Link>
            <button onClick={handleFavourites} className={`outline-star ${boardStarred}`} value={props.board.name}>
                {boardStarred === 'starred-star' ? <AiFillStar /> : <AiOutlineStar />}
            </button>
        </div>

    )
}

export default IndividualBoard;