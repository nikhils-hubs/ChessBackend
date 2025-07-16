import { app } from "./app.js";
import dotenv from "dotenv"
dotenv.config();

try {
    const PORT = process.env.PORT || 8005 
    console.log("server is about to start");
    app.listen(PORT , () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    })
} catch (error) {
    console.log("error is connecting to server!!",error)
}

