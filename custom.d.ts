// created this file to assign user property to req: Express.Request 's body

declare namespace Express {
    export interface Request {
        user: any; // Change 'any' to the actual type of 'user' if known
    }
}