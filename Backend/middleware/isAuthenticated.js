import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Unauthorized user !!!", success: false});
        }
        const isTokenValid = await jwt.verify(token,process.env.JWT_SECRET);
        if(!isTokenValid){
            return res.status(401).json({message: "Invalid Token !!!", success: false});
        }
        req.id = isTokenValid.userId
        next()
    } catch (error) {
        console.log(error);
        
    }
}

export default isAuthenticated