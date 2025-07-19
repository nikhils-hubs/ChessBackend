import {createGame, joinGame} from "../sockets/multiplayerHandler.js"

function socketMain (io) {
    io.on("connection",(socket) => {
        console.log("New User connected",socket.id);
        
        createGame(io, socket);
        joinGame(io, socket)
    
        socket.on("disconnected", () => { 
             console.log("User disconneted",socket.id)
        })
    })
}
export{
    socketMain
}