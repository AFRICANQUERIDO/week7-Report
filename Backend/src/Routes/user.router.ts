import { Router } from "express"
import { createUser, deleteUser, getOneUser, getUsers, loginUser, updateUser } from "../controllers/user.controller";
import { tokenVerification } from "../Middleware/verify.token";

const userRouter = Router()

userRouter.post('/signup',createUser)
userRouter.post('/login', loginUser)
userRouter.get('/',getUsers)
userRouter.get('user/:id',tokenVerification, getOneUser)
userRouter.post('update/:id',tokenVerification, updateUser)
userRouter.delete('delete/:id',tokenVerification, deleteUser)

export default userRouter