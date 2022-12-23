import * as bcrypt from "bcryptjs";
import { User } from "../../../server/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../server/configs/db.config";

export default async function loginHander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    await conn();
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error("User not found!");
    }
    const passwordTest = await bcrypt.compare(req.body.password, user.password);
    if (!passwordTest) throw new Error("Password is incorrect!");
    const token = await user.generateToken();
    res.status(200).json({
      success: true,
      data: user,
      t: token,
    });
  } catch (error) {
    console.log(`Err in POST /user/login: ${error}`);
    res.status(400).json({ success: false, message: `${error}` });
  }
}
