
const gameboard = (function () {

    // DOM elements
    const gameContainer = document.querySelector('.gameContainer');
    const reset = document.querySelector('.reset');
    const message = document.querySelector('.message');
    const winFrame = document.querySelector('.winFrame')


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
        marks: ['', '', '', '', '', '', '', '', ''],

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
                newCell.textContent = game.marks[item];
                gameContainer.appendChild(newCell);
            }        
        },

        reset: function () {
            game.marks = ['', '', '', '', '', '', '', '', ''];
            message.textContent = ''
            winFrame.id = 'noShow'
            game.render();
        },

        verify: function(e) {
            if (
                game.marks[0] === 'X' && game.marks[3] === 'X' && game.marks[6] === 'X' || 
                game.marks[0] === 'O' && game.marks[3] === 'O' && game.marks[6] === 'O') {
                    game.winner(0,3,6);
            } else if (
                game.marks[1] === 'X' && game.marks[4] === 'X' && game.marks[7] === 'X' ||
                game.marks[1] === 'O' && game.marks[4] === 'O' && game.marks[7] === 'O') {
                    game.winner(1,4,7);
            } else if (
                game.marks[2] === 'X' && game.marks[5] === 'X' && game.marks[8] === 'X' || 
                game.marks[2] === 'O' && game.marks[5] === 'O' && game.marks[8] === 'O') {
                    game.winner(2,5,8);
            } else if (
                game.marks[0] === 'X' && game.marks[4] === 'X' && game.marks[8] === 'X' ||
                game.marks[0] === 'O' && game.marks[4] === 'O' && game.marks[8] === 'O') {
                    game.winner(0,4,8);
            } else if (
                game.marks[2] === 'X' && game.marks[4] === 'X' && game.marks[6] === 'X' ||
                game.marks[2] === 'O' && game.marks[4] === 'O' && game.marks[6] === 'O') {
                    game.winner(2,4,6);
            } else if (
                game.marks[0] === 'X' && game.marks[1] === 'X' && game.marks[2] === 'X' ||
                game.marks[0] === 'O' && game.marks[1] === 'O' && game.marks[2] === 'O') {
                    game.winner(0,1,2);
            } else if (
                game.marks[3] === 'X' && game.marks[4] === 'X' && game.marks[5] === 'X' ||
                game.marks[3] === 'O' && game.marks[4] === 'O' && game.marks[5] === 'O') {
                    game.winner(3,4,5);
            } else if (
                game.marks[6] === 'X' && game.marks[7] === 'X' && game.marks[8] === 'X' ||
                game.marks[6] === 'O' && game.marks[7] === 'O' && game.marks[8] === 'O') {
                    game.winner(6,7,8);
            } else {
                console.log(e.target);
                return
            }
        },

        winner: function (c1, c2, c3) {
            let winner = document.getElementById(c1).textContent
            document.getElementById(c1).id = 'winner';
            document.getElementById(c2).id = 'winner';
            document.getElementById(c3).id = 'winner';
            winFrame.id = 'show'
            message.textContent = `${winner} Wins!`
            message.id= 'positive'
        },
    }


    //listeners 
    // user input listener
    gameContainer.addEventListener('click', (e) => {       

        if (game.marks[e.target.id] !== '') {
            message.textContent = 'Pick again';
            message.id = 'error';
            console.log('error');
            console.log(e.target.id);

        } else {
            message.textContent = ''
            game.marks[e.target.id] = 'X';
            game.render();
            game.verify(e);
        }
    });

    // game reset listener
    reset.addEventListener('click', game.reset);


    game.render();

})();