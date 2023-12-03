import { Request, Response } from "express";
import { userModel } from "../models";
import { createUserBody } from "../interfaces/createUser.body";

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import moment from 'moment';

export async function signUp(req: Request, res: Response) {
    try {
        let incomingBody: createUserBody = req.body;

        // check whether user already exist in db or not if not then save it in Db
        let userExist = await userModel.findOne({
            userName: incomingBody.userName,
        });

        if (userExist) {
            // throw error
            return res.status(400).json({ error: "Username already taken, please try with different unique userName" });
        }

        let hashedPassword = await bcrypt.hash(incomingBody.password, 10);
        incomingBody.password = hashedPassword;
        incomingBody.signeUp_at = moment().toDate();
        let savedUser = await userModel.create( incomingBody );

        return res.status(201).json({ message: "user signed up successfully", user: savedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
     }
}

export async function logIn(req: Request, res: Response) {
    try {
        const {userName, password} = req.body;
        
        // Check if the user exists
        const user = await userModel.findOne({userName: userName});
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        // sign token
        // i am also saving the user inside the token as well because whenevr a request comes it will be 
        // checked on every route and there will be no need to make unnecccessery call to db in order to fecth userInfo
        const token = await jwt.sign({user : user}, 'some-secret-encrypeted', {
            expiresIn: '4h'
        });

        res.status(200).json({message: 'successfully logged in', token, userDetails: user});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}