import { Request, Response } from "express";
import { userModel } from "../models";

import { updateUserBody } from "../interfaces";
import moment from "moment";

/**
 *
 * @param req
 * @param res
 * @returns the details of the logged-in user.
 */
export async function getLoggedInUser(req: Request, res: Response) {
  try {
    // unoptimized way, can be optimized
    let userId = req.user.id;

    let user = await userModel.find({ _id: userId });

    if (!user.length) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(201).json({ user: user[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 *
 * @param req
 * @param res
 * @returns Confirmation of update, updated user details.
 */
export async function updateUser(req: Request, res: Response) {
  try {
    let userId = req.params.user_id;

    // check whether user exist or not
    let user = await userModel.find({ _id: userId, user_id: req.user });

    if (!user.length) {
      return res.status(404).json({ message: "user not found" });
    }

    let { name, userName, bio, age }: updateUserBody = req.body;

    let updateBody: updateUserBody = {};

    if (userName) {
      updateBody.userName = userName;
    }
    if (name) {
      updateBody.name = name;
    }
    if (bio) {
      updateBody.bio = bio;
    }
    if (age) {
      updateBody.age = age;
    }

    let updatedUser = await userModel.findByIdAndUpdate(userId, updateBody);

    res
      .status(201)
      .json({
        message: "successfully updated user",
        updated_user: updatedUser,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

/**
 * soft delete
 * @param req
 * @param res
 * @returns Confirmation of account deletion.
 */
export async function softDeletUser(req: Request, res: Response) {
  try {
    let userId = req.params.user_id;

    // check whether user exist or not
    let user = await userModel.find({ _id: userId, user_id: req.user });

    if (!user.length) {
      return res.status(404).json({ message: "user not found" });
    }
    let gracePeriodDays = moment().toDate();

    let softeDeleted = await userModel.findByIdAndUpdate(userId, {
      isDeleted: true,
      deleteAction_date: gracePeriodDays,
    });

    return res.json({
      success: true,
      message: `User account marked for deletion. You can recover your account within the next ${gracePeriodDays} days.`,
      softeDeleted,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

/**
 * 
 * @param req 
 * @param res 
 * @returns recovers the user
 */
export async function recoverUser(req: Request, res: Response){
  try {
    const userId = req.user;

    const user = await userModel.findById(userId);

    if (user?.isDeleted && moment().isBefore(user.deleteAction_date)) {
      await userModel.findByIdAndUpdate(userId, {isDeleted : false, deleteAction_date: null });
    }

    return res.json({
      success: true,
      message: 'User account recovery successful.',
    });
  } catch ( error ) {
    console.error('Error recovering user account:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
