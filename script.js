const GameBoard = (() =>{
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
    ];

    const getGameBoard = () => gameBoard;
    
    const playMove = (symbol, index) =>{
        if(index >= 0 && index <= 8 && gameBoard[index] === '' && gameBoard.length <= 9){
            gameBoard[index] = symbol;
            return true;
        }
        return false;
    };

    const checkWinner = () =>{
        for(let pattern of winPatterns){
            if(pattern.every(index => gameBoard[index] === 'x')){
                return "x";
            } else if(pattern.every(index => gameBoard[index] === 'o')){
                return "o";
            } else if(!gameBoard.includes('')){
                return "draw";
            }
        }
    };

    const endOfRound = () => {
        return !gameBoard.includes('');
    }

    const playRound = () => {
        do{
            playMove()


        } while(!endOfRound);
    }


    return {getGameBoard, playMove, checkWinner};
})();

// function createPlayer(mark) {
//     let score = 0;
//     const getMark = () => mark; 
//     const getScore = () => score;
//     const incrementScore = () => score++;
//     const resetScore = () => {score = 0};

//     return {getMark, getScore, incrementScore, resetScore};
// }

// const GameController = ((firstPlayer, secondPlayer, numberOfRounds) => {
//     const playGame = (numberOfRounds) =>{
//         for(let i = 0; i <= numberOfRounds; i++){
//             gameBoard.playRound(firstPlayer, secondPlayer);
//         }
//     }



// })();