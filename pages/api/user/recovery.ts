import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../server/models/user.model";
import sendRecoveryEmail from "../../../server/middlewares/sendRecoveryEmail.middleware";
import { conn } from "../../../server/configs/db.config";

export default async function recoveryEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    await conn();
    const result = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    console.log(result);

    const emailSent = await sendRecoveryEmail({
      uid: result._id,
      email: result.email,
      username: result.username,
    });
    res.status(200).json({
      success: true,
      data: { message: "recovery Email sent successfully!" },
    });
  } catch (error) {
    console.log(`${error}`);

    res
      .status(400)
      .json({ success: false, data: { message: "User not found!" } });
  }
}
