import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../server/models/user.model";
import * as bcrypt from "bcryptjs";

export default async function updateInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    let user = await User.findOne({ _id: req.body.uid });
    user.password = await bcrypt.hash(req.body.updatedPass, 10);
    const result = await User.findOneAndUpdate({ _id: req.body.uid }, user);
    res.status(200).json({
      succes: true,
      data: result,
    });
  } catch (error) {
    console.log(`${error}`);
    res
      .status(400)
      .json({ success: false, data: { message: `Error: ${error}` } });
  }
}
