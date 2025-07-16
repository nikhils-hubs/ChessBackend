import { prisma } from "../DB/DB.connect.js";
import { hashPassword } from "../utils/hashPassword.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler ( async (req, res) => {
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
const loginUser = asyncHandler( async (req, res)=> {
    
})
export {
    registerUser
}