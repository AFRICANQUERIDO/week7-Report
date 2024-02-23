export interface User {
    user_id: string,
    cohort_no: string,
    fname: string,
    lname: string,
    email: string,
    phone_no: string,
    password: string,
}

export interface loginDetails {
    email: string
    fname: string
    lname: string
    password: string
    phone_number: string,
    isWelcomed: boolean,
    isDeleted: boolean
}