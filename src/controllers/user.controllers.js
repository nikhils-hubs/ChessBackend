import { prisma } from "../DB/DB.connect.js";
import { hashPassword, isPasswordCorrect } from "../utils/hashPassword.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import { generateAccessToken, generateRefreshToken } from "../utils/TokenGenerate.js";



const registerUser = asyncHandler(async (req, res, error) => {
    const { username, email, password } = req.body;
    if (!username) {
        throw new apiError(401, "username required")
    }
    if (!email) {
        throw new apiError(401, "email required")
    }
    if (!password) {
        throw new apiError(401, "password required")
    }
    if (error.code === 'P2002') {
        const fields = error.meta?.target[0] || "Field"
        throw new apiError (409 , `${fields} already exists`)
    } 
    const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
        data: {
            username: username.toLowerCase(),
            email: email,
            password: hashedPassword,
        },
    });
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                newUser,
                "User created successfully"
            )
        )
})
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username || email)) {
        throw new apiError(401, "username and password is required")
    }
    const logUser = await prisma.user.findFirst({
        where: {
            OR: [
                {
                    email:email
                },
                {
                    username:username
                }
            ]
        }
    })
    if(!logUser){
        throw new apiError(401, err?.message || "error in getting required fields")
    }
    const isPasswordVaild = await isPasswordCorrect(password, logUser.password)
    if (!isPasswordVaild) {
        throw new apiError(409,"password is incorrect")
    }
    const accessToken =  await generateAccessToken(logUser);
    const refreshToken = await generateRefreshToken(logUser);
    
    const accessTokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15*60*1000,
    }
    const refreshTokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7*24*60*60*1000,
    }
    
    return res
    .status(200)
    .cookie("AccessToken",accessToken,accessTokenOption)
    .cookie("RefreshToken",refreshToken,refreshTokenOption)
    .json(new apiResponse(
        200,
        {
            id: logUser.id,
            username: logUser.username,
            email: logUser.email,
            accessToken: accessToken,
            refreshToken: refreshToken,
        },
        "logedIn sucessfully"

    ))
})


export {
    registerUser,
    loginUser
}