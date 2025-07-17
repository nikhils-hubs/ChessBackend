import { Chess } from "chess.js";
import { apiError } from "../utils/apiError.js"
import { getBestMove } from "../bots/hardBot.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

const hardBotvsPlayer = asyncHandler(async (req, res) => {
    let { fen, move, depth } = req.body // if want to check cookies then use let otherwise const 

    if(!fen) fen = req.cookies.fen;
    if(!depth) depth = req.cookies.depth;

    if(!(fen || move)){
        throw new apiError(410, `fen move are required`)
    }
    const game = new Chess(fen);

    const playerResult = game.move(move)

    if (!playerResult) {
        throw new apiError(409, "Invaild move")
    }

    // bot move
    const botBestMove = getBestMove(depth || 2, game)
    game.move(botBestMove);

    return res
    .status(200)
    .cookie("fen", game.fen(),{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 10*60*1000
    })
    .cookie("depth", depth || 2 ,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 10*60*1000
    })
    .json(new apiResponse( 
        200,
        {
            player: move,
            bot: botBestMove,
            fen: game.fen(),
            status: game.isGameOver() ? "game_over" : "ongoing"
        },
        "Player turn"
    ))
})
export {
    hardBotvsPlayer
}


