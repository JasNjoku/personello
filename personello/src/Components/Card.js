function Card(props) {
    return (
        <div className="card">
            <p>{props.card.name}</p>
        </div>
    )
}

export default Card;