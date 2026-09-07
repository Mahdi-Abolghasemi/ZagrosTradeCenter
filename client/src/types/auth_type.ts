export type Login_type = {
    userName: string,
    password: string
}

export type Register_type = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string
}

export type AuthResult_type = {
    success: boolean,
    userName: string,
    token: string,
}

