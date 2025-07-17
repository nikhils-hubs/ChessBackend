import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import {gameStatus,playMove} from "../controllers/easyBotWork.js"

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/move").post(playMove)
router.route("/state").post(gameStatus) 


export default router