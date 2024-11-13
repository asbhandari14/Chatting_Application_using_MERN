import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ success: false, mssg: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, mssg: "Password and Confirm Password do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ success: false, mssg: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // profilePhoto

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const createdUser = await User.create({ fullname, username, password: hashedPassword, profilePhoto: (gender === "male") ? maleProfilePhoto : femaleProfilePhoto, gender });

        if (!createdUser) {
            return res.status(400).json({ success: false, mssg: "Something went wrong" });
        }

        return res.status(201).json({ success: true, mssg: "Account created successfully" })
    } catch (error) {
        console.log(error);
    }
};



export const login = async (req, res) => {
    try {
        const { username, password, gender } = req.body;
        if (!username || !password || !gender) {
            return res.status(400).json({ success: false, mssg: "All fields are required" });
        };
        const userExisted = await User.findOne({ username });
        if(gender != userExisted.gender){
            return res.status(400).json({success: false, mssg : "Gender do not match"})
        }
        if (!userExisted) {
            return res.status(400).json({ success: false, mssg: "Incorrect username or password" })
        };
        const isPasswordMatch = await bcrypt.compare(password, userExisted.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, mssg: "Incorrect username or password" })
        };
        const tokenData = {
            userId: userExisted._id
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true }).json({
            success: true,
            mssg: "Logged in successfully",
            userInfo: {
                _id: userExisted._id,
                username: userExisted.username,
                fullname: userExisted.fullname,
                profilePhoto: userExisted.profilePhoto
            }
        });

    } catch (error) {
        console.log(error);
    }
}



export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ success: true, mssg: "Logged out successfully." })
    } catch (error) {
        console.log(error);
    }
}



export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json({success: true, otherUsers});
    } catch (error) {
        console.log(error);
    }
}