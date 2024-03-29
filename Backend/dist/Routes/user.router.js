"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const verify_token_1 = require("../Middleware/verify.token");
const userRouter = (0, express_1.Router)();
userRouter.post('/signup', user_controller_1.createUser);
userRouter.post('/login', user_controller_1.loginUser);
userRouter.get('/', user_controller_1.getUsers);
userRouter.get('user/:id', verify_token_1.tokenVerification, user_controller_1.getOneUser);
userRouter.post('update/:id', verify_token_1.tokenVerification, user_controller_1.updateUser);
userRouter.delete('delete/:id', verify_token_1.tokenVerification, user_controller_1.deleteUser);
exports.default = userRouter;
