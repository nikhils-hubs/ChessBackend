import { Chess } from "chess.js";
import {apiError} from "../utils/apiError.js"

const chess =  new Chess();

const playerMove = (move) => {
    const result = chess.move(move)
    if (!result) {
        throw new apiError(401, "invaild move")
    }
    return {
        board: chess.fen(),
        pgn: chess.pgn(),
        gameOver: chess.isGameOver(),
        turn: chess.turn()
    }
}
export{
    playerMove
}