const asyncHandler = (fn) => async(req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        console.log("asynchandler error")
        const statusCode = typeof error.statusCode === "number" ? error.statusCode : 500
        res.status(statusCode).json({
            success: false,
            message: error.message,
        })
    }
}
export {
    asyncHandler
}