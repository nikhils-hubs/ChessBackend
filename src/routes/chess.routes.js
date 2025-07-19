import { Router } from "express";
import { HardbotMove } from "../bots/hardBot.js";
 import { gameStatus, playMove } from "../controllers/Bot/easyBotWork.js";
import { hardBotvsPlayer } from "../controllers/Bot/hardBotWork.js";
const router = Router();

router.route("/hard-bot-move").post(HardbotMove)
router.route("/move").post(playMove)
router.route("/state").post(gameStatus)
router.route("/play-hard-bot").post(hardBotvsPlayer)


export default router

//chessroute
