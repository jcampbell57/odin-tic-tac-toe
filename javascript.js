
const gameboard = (function () {
    const gameContainer = document.querySelector('.gameContainer');
    const gameboardArray = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']

    // for (let i = 0; i<9; i++) {
    //     let newCell = document.createElement('div');
    //     newCell.id=`cell${i}`
    //     gameContainer.appendChild(newCell);
    // }

    for (item in gameboardArray) {
        let newCell = document.createElement('div');
        newCell.id= item;
        console.log(gameboardArray[item]);
        newCell.textContent = gameboardArray[item];
        gameContainer.appendChild(newCell);
    }

    // player objects
    playerA = {
        marker: 'X',
        wins: 0,
    }
    
    playerB = {
        marker: 'o',
        wins: 0,
    }
    
    // game 
    game = {

    }


})();