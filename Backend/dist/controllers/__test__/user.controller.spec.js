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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mssql_1 = __importDefault(require("mssql"));
const user_controller_1 = require("../user.controller");
const dbhelper_1 = __importDefault(require("../../Dbhelper/dbhelper"));
describe("User Registration", () => {
    let res;
    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });
    it('successfully registers a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                cohort_no: "1",
                fname: "Jane",
                lname: "Ngene",
                email: "janengene12@gmail.com",
                phone_no: "0700000",
                password: "12345"
            }
        };
        jest.spyOn(bcrypt_1.default, 'hash').mockResolvedValueOnce("qwetjdPwdkjshghgksjgkj");
        // Mocking mssql connection and execute
        const mockedExecute = jest.fn().mockResolvedValueOnce({ rowsAffected: [1] });
        const mockedRequest = {
            input: jest.fn().mockReturnThis(),
            execute: mockedExecute
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        };
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValueOnce(mockedPool);
        yield (0, user_controller_1.createUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({ message: "User created successfully" });
    }));
    it("gets a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockedresult = [{
                user_id: '7hhsad-6e5cnbsnv-4hgdb78-wdb96hg5d-8a2w6469bi89',
                cohort_no: '22',
                fname: 'Jane',
                lname: 'Ngene',
                email: 'janengene12@gmail.com',
                phone_no: '0700000',
                password: '12345'
            }];
        const req = {
            params: {
                user_id: '7hhsad-6e5cnbsnv-4hgdb78-wdb96hg5d-8a2w6469bi89'
            }
        };
        // res ={
        //     json:jest.fn().mockReturnThis(),
        //     status:jest.fn().mockReturnThis()
        // }
        // Mocking Connection.execute
        dbhelper_1.default.execute.mockResolvedValueOnce({
            recordset: mockedresult[0]
        });
        yield (0, user_controller_1.getOneUser)(req, res);
        expect(res.json).toHaveBeenCalledWith({
            user: mockedresult[0]
        });
    }));
    it('Successfully updates a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                cohort_no: '22',
                fname: 'Jane',
                lname: 'Ngene',
                email: 'janengene12@gmail.com',
                phone_no: '0700000',
                password: '12345'
            }
        };
        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        };
        const mockedPool = {
            requset: jest.fn().mockResolvedValue(mockedRequest)
        };
        yield (0, user_controller_1.updateUser)(req, res);
        jest.spyOn(mssql_1.default, 'connect').mockResolvedValue(mockedPool);
        expect(res.status(200).json).toHaveBeenCalledWith({ message: "Details updated successfully" });
    }));
    it('sucessfully deletes a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { body: {} };
        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });
        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        };
        jest.spyOn(mssql_1.default, 'connect').mockRejectedValueOnce(mockedPool);
        yield (0, user_controller_1.deleteUser)(req, res);
        expect(res.status(200).json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    }));
});
