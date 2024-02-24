import bcrypt from 'bcrypt';
import mssql from 'mssql';
import { createUser, deleteUser, getOneUser, updateUser } from '../user.controller';
import Connection from '../../Dbhelper/dbhelper';

describe("User Registration", () => {

    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it('successfully registers a user', async () => {
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

        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("qwetjdPwdkjshghgksjgkj" as never);

        // Mocking mssql connection and execute
        const mockedExecute = jest.fn().mockResolvedValueOnce({ rowsAffected: [1] });
        const mockedRequest = {
            input: jest.fn().mockReturnThis(),
            execute: mockedExecute
        };
        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        };
        jest.spyOn(mssql, 'connect').mockResolvedValueOnce(mockedPool as never);

        await createUser(req as any, res);

        expect(res.json).toHaveBeenCalledWith({ message: "User created successfully" });
    });

    it("gets a user", async () => {
        const mockedresult = [{
            user_id: '7hhsad-6e5cnbsnv-4hgdb78-wdb96hg5d-8a2w6469bi89',
            cohort_no: '22',
            fname: 'Jane',
            lname: 'Ngene',
            email: 'janengene12@gmail.com',
            phone_no: '0700000',
            password: '12345'
        }]
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
            (Connection.execute as jest.Mock).mockResolvedValueOnce({
                recordset: mockedresult[0]
            });

        await getOneUser(req as any, res);

        expect(res.json).toHaveBeenCalledWith({
            user: mockedresult[0]
        });
    });

    it('Successfully updates a user', async () => {
        const req = {
            body: {
                cohort_no: '22',
                fname: 'Jane',
                lname: 'Ngene',
                email: 'janengene12@gmail.com',
                phone_no: '0700000',
                password: '12345'
            }
        }
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] })

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }
        const mockedPool = {
            requset: jest.fn().mockResolvedValue(mockedRequest)
        }

        await updateUser(req as any, res)

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        expect(res.status(200).json).toHaveBeenCalledWith({ message: "Details updated successfully" })
    })

    it('sucessfully deletes a user', async () => {
        const req = { body: {} }
        const mockedInput = jest.fn().mockReturnThis()
        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] })

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }
        jest.spyOn(mssql, 'connect').mockRejectedValueOnce(mockedPool as never)

        await deleteUser(req as any, res)

        expect(res.status(200).json).toHaveBeenCalledWith({ message: 'User deleted successfully' })
    })
});



