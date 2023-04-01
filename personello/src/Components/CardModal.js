function CardModal(props) {

    const close = (e) => {
        if (e.target.className !== 'edit-card-modal') {
            return;
        }
        document.querySelector('.edit-card-modal').style.display = 'none';
        props.handleModal();
    }
    return (
        <div className="edit-card-modal" onClick={close}>
            <div className="edit-card-modal__box">
                <h2>{props.card.name}</h2>
            </div>
        </div>
    )
}

export default CardModal;