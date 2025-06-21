export interface Credentials {
    email: string;
    password: string;
    username: string;
    gender: string;
    avatar: string;
    status: string;
}

export interface UserIdResponse {
    userId : number;
}

export interface AuthResponse {
    token: string;
    userId: UserIdResponse;
}