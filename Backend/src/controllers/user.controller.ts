import mssql from 'mssql'
import {v4} from 'uuid'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../Interface/userInterface'
import { sqlConfig } from '../Config/sql.config'
import { Response, Request } from 'express'

const user: User[] =[]

export const createUser = async (req: Request, res: Response) => {
    try {
        const id = v4()

        const {
            cohort_no ,
            fname ,
            lname,
            email,
            phone_no,
        password }:User = req.body
const hashed_pwd = await bcrypt.hash(password, 5)
        const pool = await mssql.connect(sqlConfig)

        let newUser = (await pool.request()
            .input("user_id", mssql.VarChar, id)
            .input("cohort_no", mssql.VarChar, cohort_no)
            .input("fname", mssql.VarChar, fname)
            .input("lname", mssql.VarChar, lname)
            .input("email", mssql.VarChar, email)
            .input("phone_no", mssql.VarChar, phone_no)
            .input("password", mssql.VarChar,hashed_pwd)
            .execute('createUser')).rowsAffected

        console.log(newUser);
        
        return res.json({

            message: "User created successfully",
        })

    } catch (error) {
        return res.json({ error: error })
    }
}

export const loginUser = async(req:Request, res:Response)=>{
    try {
        const{email,password} =req.body
        const pool = await mssql.connect(sqlConfig)

        let user = (await pool.request()
        .input("email", email)
        .input("password", password).execute('loginUser')).recordset

        console.log(user)

        if(user[0]?.email == email){
            const correct_pwd = await bcrypt.compare(password, user[0].password)

            if(!correct_pwd){
                return res.status(401).json({
                    error:"Incorrect password"
                })
            }
            const loginCredentials = user.map(response =>{
                
                const{info = email, fname, lname} = response

                return info
            })
            const token = jwt.sign(loginCredentials[0], process.env.secret as string,{
                expiresIn:'6000s'
            })
        }


    } catch (error) {
        
    }
}
export const getUsers = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        let allusers = (await pool.request().execute('getAllUsers')).recordset

        return res.status(200).json({
           users:allusers
        })
    } catch (error) {
        return res.json({ error })
    }
}

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let user = (await pool.request().input("user_id", id).execute('getOneUser')).recordset

        return res.json({
            user:user
        })
    } catch (error) {
        return res.json({ error })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const { cohort_no ,
            fname ,
            lname,
            email,
            phone_no,
        password }: User = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("user_id", mssql.VarChar, id)
        .input("cohort_no", mssql.VarChar, cohort_no)
        .input("fname", mssql.VarChar, fname)
        .input("lname", mssql.VarChar, lname)
        .input("email", mssql.VarChar, email)
        .input("phone_no", mssql.VarChar, phone_no)
        .input("password", mssql.VarChar,password)
            .execute('updateUser')).rowsAffected

        console.log(result);


        return res.status(200).json({
            message: "Details updated successfully"
        })
    } catch (error) {
        return res.json({ error })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
            .input("user_id", mssql.VarChar, id)
            .execute('deleteUser')
        ).rowsAffected

        console.log(result[0]);

        if (result[0] == 0) {
            return res.status(201).json({
                error: "User not found"
            })
        } else {
            return res.status(200).json({
                message: "User deleted successfully"
            })
        }

    } catch (error) {
        return res.json({ error })
    }
}