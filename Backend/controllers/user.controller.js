import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
       
        
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            res.status(400).json({ message: "All fields are required", success: false });
        }
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Password do not match", success: false });
        }

        const user = await User.findOne({ username })
        if (user) {
            res.status(400).json({
                message: "Username already exists",
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        await User.create({
            fullname,
            username,
            password: hashPassword,
            profilePicture: gender === "Male" ? maleProfilePic : femaleProfilePic,
            gender
        })
        return res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "All fields are required", success: false });
        }
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ message: "Invalid username or password", success: false });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid username or password", success: false });
        }
        const tokenData = {
            userId: user._id
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true }).json({ message: "User logged in successfully", user,success: true });
    } catch (error) {
        console.log(error);

    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', '', { maxAge: 0, httpOnly: true }).json({ message: "User logged out successfully", success: true });
    } catch (error) {
        console.log(error);
    }
}

// this will show the user other logged in users except the user himself/herself
export const getOtherUser = async (req, res) => {
    try {
        const loggedInUsersId = req.id;
        const otheruser = await User.find({_id : {$ne : loggedInUsersId}}).select("-password");
        return res.status(200).json(otheruser)
    } catch (error) {
        console.log(error);
        
    }
}