import { useState } from "react";
import { Card } from "../Classes/Classes";
import { RxCross1 } from "react-icons/rx";
import { v4 as uuid } from "uuid";
import { updateLocalStorage } from "../config/updateLS";
import ListCard from "./ListCard";

const List = (props) => {
  // Initialize the state with the initial value of props.list
  const [list, setList] = useState(props.list);
  const [cards, setCards] = useState(() => {
    return list.listCards
  })

  const [newCardName, setNewCardName] = useState('')
 
  const addCard = () => {
    if (newCardName.length < 1) {
      return;
  }
    let currentBoard = JSON.parse(localStorage.getItem('boards')).find(board => board.id === props.boardId)
    let newCard = new Card(uuid(), newCardName)

    setCards(prevState => [...prevState, newCard])

    currentBoard.lists.find(l => l.id === list.id).listCards.push(newCard)

    updateLocalStorage(currentBoard, 'boards')
    updateLocalStorage(currentBoard, 'recents')
    updateLocalStorage(currentBoard, 'favourites')
  }

  const showHidden = (e) => {
    e.currentTarget.parentElement.querySelector('div.add-card-functions').style.display = 'flex'
}

const closeHidden = (e) => {
    e.currentTarget.parentElement.parentElement.style.display = 'none';
}

  return (
    <div className="list">
      <div className="list-head">
        <h2>{list.name}</h2>
      </div>

      <div className="list__card-items">
        <div className="add-card">
          {cards.map(card => <ListCard card={card} boardId={props.boardId} listId={list.id} key={card.id}/>)}
          <div className="add-card-functions">
            <input onChange={(e) => { setNewCardName(e.target.value) }} placeholder="Enter a title for this card..." />
            <div className="add-card-functions__buttons">
              <button onClick={addCard}>Add Card</button>
              <button onClick={closeHidden}><RxCross1 /></button>
            </div>
          </div>
        </div>
        <button className="show-add-card-functions" onClick={showHidden}><span>+ Add a card</span></button>
      </div>
    </div>
  );
}

export default List;
