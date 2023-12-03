import { Router } from "express";
import {
    signUpValidator,
    logInValidator,
} from '../middlewares';

import { signUp, logIn } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.post('/api/users/register', signUpValidator, signUp);
authRoute.post('/api/users/login', logInValidator, logIn);

export { authRoute };