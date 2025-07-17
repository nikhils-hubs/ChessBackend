import { Chess } from "chess.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const game = new Chess();

function evaluateBoard(game) {
    if (game.isCheckmate()) {
        return game.turn() === "w" ? -Infinity : Infinity;
    }
    if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
        return 0;
    }

    const board = game.board();
    const pieceValues = {
        p: 1,   // pawn
        n: 3,   // knight
        b: 3,   // bishop
        r: 5,   // rook
        q: 9,   // queen
        k: 0    // king's value is irrelevant here
    };
    let score = 0;
    for (let row of board) {
        for (let piece of row) {
            if (piece) {
                const value = pieceValues[piece.type]
                // white = bot → add value, black = opponent → subtract value
                score += piece.color === 'w' ? value : -value;

            }
        }
    }
    return score;
}
function minimax (depth, game, isMaximizing) {
    if (depth === 0 || game.isGameOver()) {
        return evaluateBoard(game)
    }
    let bestEval = isMaximizing ? -Infinity : Infinity

    for (let move of game.moves()) {
        game.move(move);
        const evalScore = minimax(depth - 1, game, !isMaximizing);
        game.undo()
        bestEval = isMaximizing ? Math.max(bestEval, evalScore) : Math.min(bestEval, evalScore);

    }
    return bestEval;
}
function getBestMove(depth = 2 ,game){
    let bestMove = null
    let bestEval = -Infinity

    for(let move of game.moves()){
        game.move(move);
        const evalScore = minimax(depth -1, game ,false)
        game.undo()
        if (evalScore > bestEval) {
            bestEval = evalScore
            bestMove = move
        }

    }
    return bestMove;

}
const HardbotMove = asyncHandler( async ( req, res ) => {
    const {fen ,depth} =req.body
    if (!fen) {
        throw new apiError(410,"fen string is required")
    }
    const game = new Chess(fen);

    if(game.isGameOver()){
        return res.status(200)
        .json(new apiResponse(200,"gameover", {status :"game_over"}));
    }
    const bestMove = getBestMove(depth || 2 ,game);
    game.move(bestMove)
    return res.status(200)
    .json(new apiResponse(200, {
        move: bestMove,
        fen: game.fen(),
        status: game.isGameOver() ? "game_over" : "ongoing"
    }));

})

export{ 
    HardbotMove,
    getBestMove
}

