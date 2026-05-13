function createPlayer(name, mark) {
    let score = 0;
    const getScore = () => score;
    const incrementScore = () => score++;
    const resetScore = () => {score = 0};

    return {name, mark, getScore, incrementScore, resetScore};
}

// responsible for handling board moves only

const GameBoard = (() =>{
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]           
    ];

    const getGameBoard = () => gameBoard;
    
    const playMove = (mark, index) =>{
        if(index >= 0 && index <= 8 && gameBoard[index] === ''){
            gameBoard[index] = mark;
            return checkWinner();
        } else{
            throw new Error(`${index+1} position is either preoccupied or out of range`);
        }
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
        return "ongoing";
    };

    const reset = () => {gameBoard = ['', '', '', '', '', '', '', '', '']};

    return {getGameBoard, playMove, reset};
})();

const p1 = createPlayer("Salem" ,"x");
const p2 = createPlayer ("Emad", "o");

const GameController = ((firstPlayer, secondPlayer) => {
    let currentPlayer = firstPlayer;
    let nextPlayer = secondPlayer;
    let currentRound = 0;
    let result;
    const playGame = () => {
        GameBoard.reset();
        do {
            alert(`${currentPlayer.name} ${currentPlayer.mark} turn!`);
            result = GameBoard.playMove(currentPlayer.mark, prompt(`Enter the position for ${currentPlayer.name}: `));
            if(result === firstPlayer.mark){
                firstPlayer.incrementScore();
                console.log(`result ${firstPlayer.name} wins, first Player: ${firstPlayer.name} ${firstPlayer.getScore()}, Second Player: ${firstPlayer.mark} ${secondPlayer.getScore()} Board: ${GameBoard.getGameBoard()}`);
                return true;
            } else if(result === secondPlayer.mark){
                secondPlayer.incrementScore();
                console.log(`result ${secondPlayer.name} wins, first Player: ${firstPlayer.mark} ${firstPlayer.getScore()}, Second Player: ${firstPlayer.mark} ${secondPlayer.getScore()} Board: ${GameBoard.getGameBoard()}`);
                return true;
            } else if (result === "draw"){
                console.log(`result draw, first Player: ${firstPlayer.mark} ${firstPlayer.getScore()}, Second Player: ${firstPlayer.mark} ${secondPlayer.getScore()} Board: ${GameBoard.getGameBoard()}`);
                return true;
            } 
            let temp = currentPlayer;
            currentPlayer = nextPlayer;
            nextPlayer = temp;
        } while(result === "ongoing");
    };
    return {playGame};
})(p1, p2);