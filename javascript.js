
const gameboard = (function () {
    const gameContainer = document.querySelector('.gameContainer');
    const reset = document.querySelector('.reset');
    const message = document.querySelector('.message');

    // const marks = ['X', '', '', '', 'X', '', 'X', '', 'X']

    // player objects
    playerA = {
        marker: 'X',
        wins: 0,
    };
    
    playerB = {
        marker: 'O',
        wins: 0,
    };
    
    // game 
    game = {
        marks: ['X', '', '', '', 'X', '', 'X', '', 'X'],

        render: function () {

            // clear board
            let cellCount = gameContainer.childElementCount + 1;
            for (let i=1; i<cellCount; i++) {
                gameContainer.children[0].remove();
            }

            // populate board
            for (item in game.marks) {
                let newCell = document.createElement('div');
                newCell.classList.add('cell')
                newCell.id = item;
                // console.log(game.marks[item]);
                newCell.textContent = game.marks[item];
                gameContainer.appendChild(newCell);
            }        
        },

        reset: function () {
            game.marks = ['', '', '', '', '', '', '', '', ''];
            game.render();
        },

        // placeMark: function (e) {
        //     }
    }

    //listeners 
    // user input listener
    gameContainer.addEventListener('click', (e) => {
        if (game.marks[e.target.id] !== '') {
            message.textContent = 'Pick again'
            console.log('error')
            console.log(e.target.id)

        } else {
            message.textContent = ''
            game.marks[e.target.id] = 'O';
            game.render();
        }
    });
    // game reset listener
    reset.addEventListener('click', game.reset);

    game.render();

})();