export const updateLocalStorage = (newBoard, ls) => {
    let arrayName = ls.toLowerCase();
    let temp = JSON.parse(localStorage.getItem(arrayName))
    
    if (!temp) {
        console.log('This table does not exist!')
    }

    temp.forEach((board, index) => {
        if (board.id === newBoard.id) {
            temp.splice(index, 1, newBoard)
        }
    })

    localStorage.setItem(arrayName, JSON.stringify(temp))

}
