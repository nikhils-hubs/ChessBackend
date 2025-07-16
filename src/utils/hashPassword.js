import bcrypt from "bcrypt"

const hashPassword = async ( password ) => {
    const saltRounds = 10;
    return await bcrypt.hash(password,saltRounds);

}
const isPasswordCorrect = async ( plainPassword,hashPassword ) => {
    return await bcrypt.compare(plainPassword ,hashPassword)
}
export{
    hashPassword,
    isPasswordCorrect
}