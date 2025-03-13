import User2 from '../models/userModel.js'
import bcrypt from "bcryptjs";
import {generateAccessToken} from "../utils/tokenGenerate.js"
export const Register = async(req,res)=>{

    try{
        const { name, password, userRole } = req.body;

    //Check if the userName exists

    const existingUser = await User2.findOne({ name });

    if (existingUser) {
        return res.status(400).json({ message: "UserName already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); //10 is the salt rounds
    const user = new User2({ name, password: hashedPassword,userRole })
    user.tokens.accessToken = generateAccessToken(user);

    await user.save();
    res.status(201).json({ success: true, message: "User registered successfully", 
        user:{
          _id:user._id, 
          name: user.userName,
          userRole: user.userRole,
            tokens:{
                accessToken:user.tokens.accessToken,
            }
         }
        });
    }catch(error){
        res.status(500).json({error: error.message});
    }
}