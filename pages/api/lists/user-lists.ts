import { NextApiResponse, NextApiRequest } from "next";
import { Lists } from "../../../server/models/lists.model";

export default async function getUserLists(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.body.uid) throw new Error("UserId not provided!");
    if (req.body.lns?.length) {
      const result = await Lists.find({
        userID: req.body.uid,
        listName: { $in: req.body.lns },
      });
      return res.status(200).json({ success: true, data: result });
    }
    const result = await Lists.find({ userID: req.body.uid });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(`Err in GET /lists/userLists ${error}`);
    res.status(400).json({
      success: false,
      message: `Err in GET /lists/userLists ${error}`,
    });
  }
}
