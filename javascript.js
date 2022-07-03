
const gameboard = (function () {
    const gameContainer = document.querySelector('.gameContainer');
    const gameboardArray = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']

    for (let i = 1; i<10; i++) {
        let newCell = document.createElement('div');
        newCell.id=`cell${i}`
        gameContainer.appendChild(newCell);
    }

    // player objects
    playerA = {
        // marker: marker,
        // score: score,
    }
    
    playerB = {
        // marker: marker,
        // score: score,
    }
    
    // game 
    game = {
        render: function () {
            return gameContainer.innerHTML = `${gameboardArray}`
        }
    }

    return gameboardArray;
    return game;

})();