import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Boards() {
    const [board, setBoard] = useState({})
    const { id } = useParams();

    useEffect(() => {
        JSON.parse(localStorage.getItem('boards')).map(board => {
            if(board.name === id) {
                setBoard(board)
                //check if recents already has the board!!, max recents 4. push new recent, pop last recent!
                localStorage.setItem('recents', `[${JSON.stringify(board)}]`)
            }
        }) 
    }, [id])

    return (
        <div className={board.background}>
            <h1>
                I am a board number {id}
            </h1>
        </div>
    )
}

export default Boards;