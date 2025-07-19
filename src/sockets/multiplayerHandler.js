import { v4 as uuidv4 } from "uuid"
import { prisma } from "../DB/DB.connect.js";
import { apiError } from "../utils/apiError.js"

function createGame(io, socket) {
    socket.on("creategame", async ({ userId }) => {
        try {
            const gameCode = uuidv4().slice(0, 6);
            const isWhite = Math.random() < 0.5  //? "white" : "black"

            const newGame = await prisma.game.create({
                data: {
                    gamecode: gameCode,
                    whiteId: isWhite ? {connect: {id: userId}} :undefined,
                    blackId: isWhite ? {connect: {id: userId}} :undefined,
                    status: "waiting",
                    result: "pending",
                    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
                    movehistory: [],
                }
            })



            const roomId = `game_${newGame.id}`
            socket.join(roomId)
            socket.emit("gameCreated", {
                gameId: newGame.id,
                gameCode,
                color: isWhite ? "white" : "black",
                room: roomId,
            })
            io.to(roomId).emit("system Message", `${userId} created room ${roomId}`)
        }
        catch (error) {
            console.error("CreateGame Error:", error.message || error);
            socket.emit("error", error?.message || "Error while creating a game");
        }
    })
}
function joinGame(io, socket) {
    socket.on("joinGame", async ({ gameId, userId }) => {
        try {
            const game = await prisma.game.findUnique(
                {
                    where: {
                        gamecode: gameId
                    }
                }
            )
            if (!game) {
                throw new apiError(401, "No game code found")
            }
            let updatedGame = game;
            if (game.status === "waiting") {
                const isWhiteMissing = !game.whiteId
                const isBlackMissing = !game.blackId
            
            if (!(isWhiteMissing || isBlackMissing)) {
                throw new apiError(410 ,"Game have already two Player")
            }
                const updateGame = await prisma.game.update({
                    where: {
                        id: game.id
                    },
                    data: {
                        black: 1,
                        white: 6,
                        status: "ongoing",
                        fen: newFen,
                        movehistory: {
                            push: newMove
                        }
                    }
                })
                const roomId = `game_${updateGame.id}`
                socket.join(roomId);
            }
        
            socket.on("move", async ({ gameId, move }) => {
                const roomId = `game_${gameId}`
                io.to(roomId).emit("move", move)
                await prisma.game.update({
                    where: { id: gameId },
                    data: {
                        fen,
                        movehistory: {
                            push: move,
                        },
                    },
                });
            })

            socket.on("gameover", async ({ gameId, winnerId, result }) => {
                await prisma.game.update({
                    where: { id: gameId },
                    data: {
                        status: "finished",
                        result,
                        winnerID: winnerId
                    }
                });
                io.to(`game_${gameId}`).emit("gameover", { winnerId, result })
            })

            socket.on("disconnect", () => {
                console.log(`${userId} got disconnected`);

            })
        } catch (error) {
            throw new apiError(409, error?.message || "error while joing game"),
            socket.emit("error", "error while joing a game ")
        }
    })
}




export {
    createGame,
    joinGame
}