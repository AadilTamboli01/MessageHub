import jwt from "jsonwebtoken"
function generateToken(userId, res) {
    try {
        // generate Jwt token 
        const token = jwt.sign(
            { userId: userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // set cookies 
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return token;
    } catch (error) {
        res.send({ success: false, message: error.message })
    }

}

export default generateToken;