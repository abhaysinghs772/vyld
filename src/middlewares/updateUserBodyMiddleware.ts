import { Request, Response, NextFunction } from "express";
import Joi from 'joi';

export async function updateUserBodyMiddleware(req: Request, res: Response, next: NextFunction) {
    const updateUserSchema = Joi.object({
        name: Joi.string().required(),
        userName: Joi.string().required(),
        age: Joi.number().integer().min(13), // i am assuming that user must be a teenager
        bio: Joi.string().min(200).max(500), // i am assuming user can only insert min 200 character and max 500 charecters and it is not required field
    });

    const {error, value} = updateUserSchema.validate(req.body);

    if (error){
        // If validation fails, send an error response
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
}