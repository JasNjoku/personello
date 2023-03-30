import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";

function IndividualBoard(props) {
    return (
        <div>
        <Link key={props.board.name} to={`boards/${props.board.name}`}>
            <div className={props.board.background}>
                {props.board.name}
                
            </div>
        </Link>
        <button onClick={props.add} className="outline-star" value={props.board.name}><AiOutlineStar /></button>
        </div>
        
    )
}

export default IndividualBoard;