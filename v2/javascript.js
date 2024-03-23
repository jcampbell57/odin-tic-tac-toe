(function() {
  const gameBoard = (() => {
    let squares = ['', '', '', '', '', '', '', '', ''];
    
    const setSquare = (index, marker) => {
      // input validation
      if (index >= 0 &&
          index < squares.length &&
          squares[index] === '') {
        squares[index] = marker;
        return true;
      } else {
        return false;
      };
    }

    const getBoard = () => squares;

    const reset = () => {
      squares = ['', '', '', '', '', '', '', '', ''];
    };

    const render = () => {
      let rendering = []
      for (let row = 0; row < 3; row++) {
        let rowContent = '';
        for (let col = 0; col < 3; col++) {
          const index = row * 3 + col;
          const squareContent = squares[index] === '' ? (index + 1).toString() : squares[index];
          rowContent += (col > 0 ? ' | ' : '') + squareContent;
        }
        rendering[row] = rowContent
      }
      return rendering
    }

    return { setSquare, getBoard, reset, render };
  })();

  function player(marker) {
    return { marker };
  };

  const game = (function() {
    const playerX = player('X')
    const playerO = player('O')
    let currentPlayer = playerX

    const promptTurn = () => {
      currentRendering = gameBoard.render();
      const index = window.prompt(`
        ${currentPlayer.marker}'s turn. 

        ${currentRendering[0]}
        ${currentRendering[1]} 
        ${currentRendering[2]}

        Enter a position (1-9):`
      );    
      processInput(parseInt(index) - 1);
    }

    let winner = () => {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      for (let combo of winningCombinations) {
        combo.forEach(index => {  
          console.log(gameBoard.getBoard()[index])
          console.log(currentPlayer.marker)
        });
      }

      for (let combo of winningCombinations) {
        if (combo.every(index => gameBoard.getBoard()[index] === currentPlayer.marker)) {
          return currentPlayer;
        }
      }
      return false;
    };

    const processInput = (index) => {
      if (gameBoard.setSquare(index, currentPlayer.marker)) {
        const gameWinner = winner()
        if (gameWinner) {
          window.alert(`${gameWinner.marker} wins!`)
        } else {
          // Check for a draw or continue the game
          const isDraw = gameBoard.getBoard().every(square => square !== '');
          if (isDraw) {
            window.alert("It's a draw!");
            // gameBoard.reset();
            // gameBoard.render();
          } else {
            // Switch player and continue the game
            currentPlayer = (currentPlayer === playerX ? playerO : playerX);
            gameBoard.render();
            promptTurn(); // Prompt next turn
          }
        }
      } else {
        promptTurn(); // Re-prompt the same player
      }
    }

    const init = () => {
      gameBoard.render();
      promptTurn();
    }

    return { init };
  })();

  game.init();
})();
