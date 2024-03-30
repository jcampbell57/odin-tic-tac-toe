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
      let gameBoard = document.querySelector('.gameBoard').children
      for (let square of gameBoard) {
        square.textContent=squares[square.id]
      }
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
    messageContainer = document.querySelector('.messageContainer')
    overlay = document.getElementById('overlay')

    const promptTurn = () => {
      messageContainer.textContent = `${currentPlayer.marker}'s turn`
    }

    let winner = () => {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

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
          gameBoard.render();
          overlay.style.display = "block"
          messageContainer.textContent = `${gameWinner.marker} wins!`
        } else {
          // Check for a draw or continue the game
          const isDraw = gameBoard.getBoard().every(square => square !== '');
          if (isDraw) {
            gameBoard.render();
            overlay.style.display = "block"
            messageContainer.textContent = "It's a draw!"
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

    const reset = () => {
      overlay.style.display = "none"
      gameBoard.reset();
      gameBoard.render();
      currentPlayer = playerX;
      promptTurn();
    }

    const setListeners = () => {
      let boardSquares = document.querySelector('.gameBoard').children;
      // for loop for html element
      for (let boardSquare of boardSquares) {
        boardSquare.addEventListener('click', (e) => {
          if (e.target.id !== 'overlay') {
            processInput(boardSquare.id);  
          }        
        });
      };

      let resetButton = document.getElementById('resetButton');
      resetButton.addEventListener('click', () => reset());
    };

    const init = () => {
      overlay.style.display = "none"
      gameBoard.render();
      setListeners();
      promptTurn();
    };

    return { init };
  })();

  game.init();
})();
