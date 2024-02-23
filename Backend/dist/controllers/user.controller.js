"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sql_config_1 = require("../Config/sql.config");
const user = [];
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { cohort_no, fname, lname, email, phone_no, password } = req.body;
        const hashed_pwd = yield bcrypt_1.default.hash(password, 5);
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let newUser = (yield pool.request()
            .input("user_id", mssql_1.default.VarChar, id)
            .input("cohort_no", mssql_1.default.VarChar, cohort_no)
            .input("fname", mssql_1.default.VarChar, fname)
            .input("lname", mssql_1.default.VarChar, lname)
            .input("email", mssql_1.default.VarChar, email)
            .input("phone_no", mssql_1.default.VarChar, phone_no)
            .input("password", mssql_1.default.VarChar, hashed_pwd)
            .execute('createUser')).rowsAffected;
        console.log(newUser);
        return res.json({
            message: "User created successfully",
        });
    }
    catch (error) {
        return res.json({ error: error });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password } = req.body;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let user = (yield pool.request()
            .input("email", email)
            .input("password", password).execute('loginUser')).recordset;
        console.log(user);
        if (((_a = user[0]) === null || _a === void 0 ? void 0 : _a.email) == email) {
            const correct_pwd = yield bcrypt_1.default.compare(password, user[0].password);
            if (!correct_pwd) {
                return res.status(401).json({
                    error: "Incorrect password"
                });
            }
            const loginCredentials = user.map(response => {
                const { info = email, fname, lname } = response;
                return info;
            });
            const token = jsonwebtoken_1.default.sign(loginCredentials[0], process.env.secret, {
                expiresIn: '6000s'
            });
        }
    }
    catch (error) {
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let allusers = (yield pool.request().execute('getAllUsers')).recordset;
        return res.status(200).json({
            users: allusers
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getUsers = getUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let user = (yield pool.request().input("user_id", id).execute('getOneUser')).recordset;
        return res.json({
            user: user
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getOneUser = getOneUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { cohort_no, fname, lname, email, phone_no, password } = req.body;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = (yield pool.request()
            .input("user_id", mssql_1.default.VarChar, id)
            .input("cohort_no", mssql_1.default.VarChar, cohort_no)
            .input("fname", mssql_1.default.VarChar, fname)
            .input("lname", mssql_1.default.VarChar, lname)
            .input("email", mssql_1.default.VarChar, email)
            .input("phone_no", mssql_1.default.VarChar, phone_no)
            .input("password", mssql_1.default.VarChar, password)
            .execute('updateUser')).rowsAffected;
        console.log(result);
        return res.status(200).json({
            message: "Details updated successfully"
        });
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        let result = (yield pool.request()
            .input("user_id", mssql_1.default.VarChar, id)
            .execute('deleteUser')).rowsAffected;
        console.log(result[0]);
        if (result[0] == 0) {
            return res.status(201).json({
                error: "User not found"
            });
        }
        else {
            return res.status(200).json({
                message: "User deleted successfully"
            });
        }
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.deleteUser = deleteUser;
