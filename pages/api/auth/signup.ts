import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../server/models/user.model";
import { Lists } from "../../../server/models/lists.model";
import { sendVerificationEmail } from "../../../server/middlewares/sendVerificationEmails.middleware";
import { conn } from "../../../server/configs/db.config";

export default async function createAccountHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await conn();
    const result = await new User(req.body).save();
    const token = await result.generateToken();
    const listResult = await new Lists({
      userID: result._id,
      listName: "Bookmarks",
    }).save();
    res.status(201).json({ success: true, data: result, t: token });
    const emailSent = await sendVerificationEmail({
      email: result.email,
      userID: result.id,
      username: result.username,
    });
    console.log(emailSent);
  } catch (error) {
    console.log(`Err in POST /user/create-account: ${error}`);
    res.status(400).json({ success: false, message: `${error}` });
  }
}
