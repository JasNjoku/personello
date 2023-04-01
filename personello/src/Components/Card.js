import CardModal from "./CardModal";


function Card(props) {
    const showCardModal = () => {
        props.handleClick(props.card)
    }

    return (
        <div className="card" onClick={showCardModal}>
            <p>{props.card.name}</p>
        </div>
    )
}

export default Card;