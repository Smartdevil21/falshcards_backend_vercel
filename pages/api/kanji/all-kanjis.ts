//To get kanjis based on the "limit" parameter

import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../server/configs/db.config";
import { Kanjis } from "../../../server/models/kanji.model";

export default async function getAllKanjisHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    await conn();
    const result = await Kanjis.aggregate([
      { $sample: { size: req.body.limit || 100 } },
    ]);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(`Err in GET /kanjis/all ${error}`);
    res
      .status(400)
      .json({ success: false, message: `Err in GET /kanjis/all ${error}` });
  }
}
