import jwt from 'jsonwebtoken';
import User from "../Models/Users.models.js";
import { useInsertionEffect } from 'react';

const verifyToken = async (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message: 'Access Denied. No token provided.', error:true});
    }
    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifiedToken){
            return res.status(403).json({message:"Invalid token! Access Denied", error:true});
        }

        const user = await User.findById(verifiedToken.id).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found.', error:true});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: 'Invalid token.', error:true});
    }
}