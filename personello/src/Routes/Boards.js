import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Boards() {
    const [board, setBoard] = useState({})
    const { id } = useParams();

    

    useEffect(() => {
        JSON.parse(localStorage.getItem('boards')).forEach(board => {
            if(board.name === id) {
                setBoard(board)
                if(localStorage.recents === undefined || localStorage.getItem('recents') === '' || localStorage.getItem('recents') === '[]') {
                    localStorage.setItem('recents', `[${JSON.stringify(board)}]`)
                } 
                else {  
                    let alreadyInRecents = false;
                    if(alreadyInRecents === false) {
                        JSON.parse(localStorage.getItem('recents')).forEach((b, index) => {
                        if(b.name.toLowerCase() === board.name.toLowerCase()) {
                            const temp = JSON.parse(localStorage.getItem('recents'));
                            temp.splice(index, 1)
                            temp.unshift(b)
                            localStorage.setItem('recents', `${JSON.stringify(temp)}`)
                            alreadyInRecents = true;
                        }
                    })
                    } 

                    if(JSON.parse(localStorage.getItem('recents')).length < 6 && alreadyInRecents === false) {
                        const temp = JSON.parse(localStorage.getItem('recents'));
                        temp.unshift(board)
                        localStorage.setItem('recents', `${JSON.stringify(temp)}`)
                    } 

                    if(JSON.parse(localStorage.getItem('recents')).length === 6) {
                        const temp = JSON.parse(localStorage.getItem('recents'));
                        temp.pop();
                        localStorage.setItem('recents', `${JSON.stringify(temp)}`)
                    }

                }
            }
        }) 
    }, [id])

    return (
        <div className={`board-container ${board.background}`}>
            <h1>
                I am a board number {id}
            </h1>
        </div>
    )
}

export default Boards;