//For logging in using token

import { NextApiRequest, NextApiResponse } from "next";
import * as jwt from "jsonwebtoken";
import { User } from "../../../server/models/user.model";
import { conn } from "../../../server/configs/db.config";

export default async function loginUsingToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await conn();
    const uid = await jwt.verify(
      req.query.t as string,
      process.env.JWT_KEY as string
    );
    const result = await User.findOne({ _id: uid });
    if (!result) throw new Error("User not found!");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: `User not found!` });
  }
}
