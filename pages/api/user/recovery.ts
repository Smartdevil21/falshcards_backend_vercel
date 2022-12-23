import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../server/models/user.model";
import sendRecoveryEmail from "../../../server/middlewares/sendRecoveryEmail.middleware";

export default async function recoveryEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    const result = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
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
    res
      .status(400)
      .json({ success: false, data: { message: "User not found!" } });
  }
}
