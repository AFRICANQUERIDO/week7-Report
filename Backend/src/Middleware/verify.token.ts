import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { loginDetails } from "../Interface/userInterface";

dotenv.config()

export interface ExtendedUserRequest extends Request{
    info?:loginDetails
}

export const tokenVerification = (req:ExtendedUserRequest,res:Response, next:NextFunction)=>{
    try{
        const token = req.headers['token'] as string
        if(!token){
            return res.json({
                message:'You do not have access'
            })
        }
        const data = jwt.verify(token, process.env.secret as string )as loginDetails

        req.info = data
    }catch(error){
        return res.json({
            error:error
        })
    }
}