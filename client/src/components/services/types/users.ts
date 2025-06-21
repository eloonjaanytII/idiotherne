export interface UserData {
    id: number;
    username: string;
    avatar: string;
    gender: string;
    status: string;
}

export interface MessageResponse {
    message: string;
}

export interface UserList {
    usersList: UserData[];
    countUsers: number;
    message: MessageResponse;
}