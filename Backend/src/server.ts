import express, { NextFunction, Request, Response, json } from 'express'
import cors from 'cors'
import userRouter from './Routes/user.router'
const app = express()

app.use(cors())

app.use(json)

app.use('/users', userRouter)

app.use((error:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({message:error.message})
})

let port: number = 5000;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})

export default app