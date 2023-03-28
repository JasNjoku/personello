import { Link } from "react-router-dom";

function IndividualBoard(props) {
    return (
        <Link key={props.board.name} to={`boards/${props.board.name}`}>
            <div className={props.board.background}>
                {props.board.name}
            </div>
        </Link>
    )
}

export default IndividualBoard;