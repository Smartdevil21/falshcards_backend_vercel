//For creating lists by using userid

import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../server/configs/db.config";

import { Lists } from "../../../server/models/lists.model";

export default async function createListHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    if (!req.query.uid || !req.query.ln)
      throw new Error("Either un or ln parameters are nor provided.");
    await conn();
    const result = await new Lists({
      userID: req.query.uid,
      listName: req.query.ln,
    }).save();
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
    console.log(`Err in GET /lists/create : ${error}`);
  }
}
