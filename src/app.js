import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import { apiError } from "./utils/apiError.js";


const app = express()
const port = process.env.PORT || 8005

// app.get('/',(req, res)=>{
//     res.send("chess backend")
// });
// app.listen(port, () => {
//     console.log(`server is running at ${port}`);
    
// })
// config of .env File
dotenv.config(
    {
        path: './.env'
    }
)
// middleware setup
app.use(cors({
    origin: process.env.ORIGIN_CORS,
    credentials: true,
}));
app.use(express.json({ limit:"16kb" }))
app.use(express.urlencoded({ extended: true }))

// IMPORTING THE ROUTES
import userRoute from "./routes/user.routes.js"
app.use("/api/v1/users",userRoute)

// error handling 
const createVersionRoute = (route , version = "v1") => "/api/" + version + "/" + route;


app.use((err, req, res, next) =>{
    console.log(err);
    
    if (err?.statusCode) {
        return res.status(err.statusCode || 500).json(err)
    }
    return res
    .status(500)
    .json(new apiError(err.statusCode || 500,"an error occured",err.message))
})
// for 404 error
app.use((req, res, next, err) => {
    res.status(404).json(new apiError(404,"Route Not Found"))
    next();
})

export {
    app
}


