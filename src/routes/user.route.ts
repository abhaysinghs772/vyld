import { Router } from "express";
import {
    getLoggedInUser,
    updateUser, 
    softDeletUser,
    recoverUser
} from "../controllers";

import {
    authMiddleware,
    updateUserBodyMiddleware,
} from '../middlewares';

const userRoute = Router();

userRoute.get('/api/users/details', authMiddleware, getLoggedInUser );
userRoute.put('/api/users/update',authMiddleware, updateUserBodyMiddleware, updateUser);
userRoute.delete('/api/users/delete', authMiddleware, softDeletUser);
userRoute.delete('/api/users/recover-user', authMiddleware, recoverUser);

export { userRoute };