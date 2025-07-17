import { Chess } from "chess.js";

const chess =  new Chess();

const botMove = () => {
    if(chess.isGameOver()){
        return {
            move: null,
            message: "Game is Over, Player won"
        }
       
    }
    const legalMoves = chess.moves();
    const randomMove = legalMoves[Math.floor(Math.random()*legalMoves.length)];
    chess.move(randomMove);

    return {
        move: randomMove,
        board: chess.fen(),
        pgn: chess.pgn(),
        gameOver: chess.isGameOver(),
        turn: chess.turn()
    }

}
const gameState = () => {
    return {
        board: chess.fen(),
        pgn: chess.pgn(),
        gameOver: chess.isGameOver(),
        turn: chess.turn()
    
    }
}
export {
    botMove,
    gameState
}