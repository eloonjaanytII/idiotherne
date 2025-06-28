export interface RegisterRequest {
    email: string;
    password: string;
    username: string;
    gender: string;
    avatar: string;
    status: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface UserIdResponse {
    userId : number;
}

export interface AuthResponse {
    token: string;
    userId: number;
}