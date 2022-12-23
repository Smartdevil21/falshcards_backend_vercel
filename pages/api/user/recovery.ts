import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../server/models/user.model";

export default async function verifyUserEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    const result = await User.findOneAndUpdate(
      { _id: req.query.uid },
      { emailVerified: true },
      { returnNewDocument: true }
    );
    if (!result) throw new Error("User not found!");
    // res.status(200).sendFile(path.join(__dirname, "/index.html"));
    res.status(200).send("Email verified Successfully!");
  } catch (error) {
    console.log(`Err in GET /user/verify-email : ${error}`);
    res.status(400).json({ success: false, data: { message: `${error}` } });
  }
}
