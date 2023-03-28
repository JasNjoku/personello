import { useParams } from "react-router-dom";

function Boards() {
    const { id } = useParams();
    return (
        <div>
            <h1>
                I am a board number {id}
            </h1>
        </div>
    )
}

export default Boards;