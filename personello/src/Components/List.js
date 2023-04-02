import { useEffect, useState } from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa"
import CardModal from "./CardModal";


function List(props) {
    const { id } = useParams();
    let board = JSON.parse(localStorage.getItem('boards')).find((x) => x.name === id);
    let listID = props.listId
    let list = board.lists[listID]
    const [cards, setCards] = useState(list.listCards);
    const [cardName, setCardName] = useState('');
    const [currentCard, setCurrentCard] = useState({});


    const showHidden = (e) => {
        e.currentTarget.parentElement.querySelector('div.add-card-functions').style.display = 'flex'
    }

    const closeHidden = (e) => {
        e.currentTarget.parentElement.parentElement.style.display = 'none';
    }

    const createCard = () => {
        let card = { id: 0, name: '', description: '', todos: [] }

        if (cardName.length >= 1) {
            card.name = cardName;
            card.id = board.lists[props.listId].listCards.length + 1
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

    const addCardDesc = (cardId, description) => {
        board.lists[props.listId].listCards[cardId - 1].description = description;
        const allBoards = JSON.parse(localStorage.getItem('boards'));
        allBoards.forEach((element, index) => {
            if (element.name === board.name) {
                allBoards.splice(index, 1, board)
            }
        })

        localStorage.setItem('boards', `${JSON.stringify(allBoards)}`)
    }


    const addCardTodo = (cardId, todoItem) => {

        const temp = board.lists[props.listId].listCards[cardId - 1].todos;

        board.lists[props.listId].listCards[cardId - 1].todos.push(todoItem)
        const allBoards = JSON.parse(localStorage.getItem('boards'));
        allBoards.forEach((element, index) => {
            if (element.name === board.name) {
                allBoards.splice(index, 1, board)
            }
        })

        console.log(temp, board.lists[props.listId].listCards[cardId - 1].todos)
        localStorage.setItem('boards', `${JSON.stringify(allBoards)}`)
    }


    const deleteList = () => {
        board.lists.forEach((list, index) => {
            if(index === props.listId) {
                props.deleteFromList(index)
            }
        })
    }

    useEffect(() => {
        if (currentCard.name !== undefined) {
            document.querySelector('.edit-card-modal').style.display = 'flex';
        }
    }, [currentCard])

    const handleCardClick = (card) => {
        setCurrentCard(card)
    }

    const handleModal = () => {
        setCurrentCard({});
    }

    return (
        <div
            className="list"
            key={props.index}
        >
            <div className="list-head">
                <p>{props.name}</p>
                {/* <button title="Delete List" onClick={deleteList}>
                    <FaTrashAlt />
                </button> */}
            </div>


            <div className="list__card-items">
                <div className={`.add-card-${props.listId}`}>
                    {cards.map((card, index) => <Card card={card} key={index} handleClick={handleCardClick} />)}
                    <div className="add-card-functions">
                        <input onChange={(e) => { setCardName(e.target.value) }} placeholder="Enter a title for this card..." />
                        <div className="add-card-functions__buttons">
                            <button onClick={createCard}>Add Card</button>
                            <button onClick={closeHidden}><RxCross1 /></button>
                        </div>
                    </div>
                </div>
                <button className="show-add-card-functions" onClick={showHidden}><span>+ Add a card</span></button>
            </div>
            {currentCard.name !== undefined ? 
                <CardModal 
                    handleModal={handleModal} 
                    card={currentCard} 
                    addCardDesc={addCardDesc}
                    addCardTodo={addCardTodo}
                    listID={listID}
                /> : null}
        </div>
    )

}

export default List;