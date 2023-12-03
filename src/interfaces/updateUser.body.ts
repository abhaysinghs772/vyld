import { Date } from "mongoose";

export interface updateUserBody {
    name?: string,
    userName?: string,
    bio?: string,
    age?: number,
}