import bcrypt from 'bcrypt'
import mssql from 'mssql'
import { createUser } from '../user.controller'

describe("User Registration", ()=>{

    let res: any;

    beforeEach(()=>{
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('successfully registers a user', async()=>{
        const req ={
            body:{
                cohort_no: "1",
                fname: "Jane",
                lname: "Ngene",
                email: "janengene12@gmail.com",
                phone_no: "0700000",
                password: "12345"
            }
        }

        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("qwetjdPwdkjshghgksjgkj" as never)

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await createUser(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message: "User created successfully"})
        // expect(res.status).toHaveBeenCalledWith(200)

    })


})


