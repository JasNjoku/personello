import { useEffect, useState } from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";


function List(props) {
    const { id } = useParams();
    let board = JSON.parse(localStorage.getItem('boards')).find((x) => x.name === id);
    let list = board.lists[props.listId]
    const [cards, setCards] = useState(list.listCards);
    const [cardName, setCardName] = useState('');
    // const list = board.lists[props.listId];
    // let cardItems = list.listCards;

    // useEffect(() => {
    //     console.log(cards)
    // })

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
        let card = { name: '', todos: [] }


        if (cardName.length >= 3) {
            card.name = cardName;
            board.lists[props.listId].listCards.push(card)
            const allBoards = JSON.parse(localStorage.getItem('boards'));

            allBoards.forEach((element, index) => {
                if (element.name === board.name) {
                    allBoards.splice(index, 1, board)
                }
            })
            
            localStorage.setItem('boards', `${JSON.stringify(allBoards)}`)
            setCards(prevState => [...prevState, card])
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
                <div className={`.add-card.${props.listId}`}>
                    {cards.map((card, index) => <Card card={card} key={index} />)}
                    <input onChange={(e) => { setCardName(e.target.value) }} placeholder="Enter card name..." />
                    <button onClick={createCard}>Create Card</button>
                </div>
                <button onClick={showHidden}>Add a card</button>
            </div>
        </div>
    )

}

export default List;