//For creating lists by using userid

import { NextApiRequest, NextApiResponse } from "next";

const Lists = require("../../models/lists.model");

export default async function createListHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.query.uid || !req.query.ln)
      throw new Error("Either un or ln parameters are nor provided.");
    const result = await Lists({
      userID: req.query.uid,
      listName: req.query.ln,
    }).save();
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: `${error}` });
    console.log(`Err in GET /lists/create : ${error}`);
  }
}
