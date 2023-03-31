import { useEffect, useState } from "react";
import Card from "./Card";


function List(props) {
    const [cards, setCards] = useState([]);
    const [cardName, setCardName] = useState('');

    const dragStart = (e) => {
        e.target.classList.add('dragging')
    }

    const dragEnd = (e) => {
        e.target.classList.remove('dragging')
    }

    const showHidden = () => {
        document.querySelector(`.add-card.${props.index}`).style.display = 'block'
    }

    const createCard = () => {
        if(cardName.length > 3) {
            setCards(prevState => [...prevState, cardName])
        }
    }

    return (
        <div 
            className="list" 
            draggable="true" 
            key={props.index}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
        >
            <p>{props.name}</p>
            
            <div className="list__card-items">
                <div className={`.add-card.${props.index}`}>
                    {cards.map(card => <Card cardName={card}/>)}
                    <input onChange={(e) => {setCardName(e.target.value)}} placeholder="Enter card name..."/>
                    <button onClick={createCard}>Create Card</button>
                </div>
                <button onClick={showHidden}>Add a card</button>
            </div>
        </div>
    )

}

export default List;