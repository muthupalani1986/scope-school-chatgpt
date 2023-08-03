export interface LoginPayload {
    username:string;
    password:string
}

export interface LoginResponse{
    firstName?:string;
    lastName?:string;
    tokenId?:string;
}