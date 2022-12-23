// Get kanjis according to levels

import { NextApiResponse, NextApiRequest } from "next";
import { conn } from "../../../server/configs/db.config";
import { Kanjis } from "../../../server/models/kanji.model";

export default async function getkanjisByLevelHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    await conn();
    if (!req.query.l) throw new Error("Level required!");
    const result = await Kanjis.find({ level: req.query.l });
    res.status(200).json({
      success: true,
      level: req.query.l,
      data: result,
    });
  } catch (e) {
    console.log("Err at GET /kanji: ", e);
    res.status(400).json({ success: false, message: `${e}` });
  }
}
