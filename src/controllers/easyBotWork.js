import { gameState, botMove } from "../bots/EasyBot.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import { playerMove } from "./playerMove.js"

const playMove = asyncHandler(async (req, res) => {
    const { move } = req.body;
    const player = playerMove(move)
    if (player.error) {
        return res.status(409).json({ success: false, message: player.error })
    }
    const bot = botMove()

    return res.status(200)
        .json(new apiResponse(200,
            {
                player,
                bot,
                gameState: gameState()

            },
            "Player turn"
        ))

})
const gameStatus = asyncHandler(async (req,res) => {
    return res.status(200)
    .json(new apiResponse(200,{gameState: gameState()},"Status of current game"))
})
export{
     playMove,
     gameStatus
}