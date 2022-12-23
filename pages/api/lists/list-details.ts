// To get all kanjis belonging to a particular list

import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../server/configs/db.config";
import { Kanjis } from "../../../server/models/kanji.model";

export default async function getAllKanjisOfList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    await conn();
    const result = await Kanjis.find({ word: { $in: req.body.listArr } });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(`Err in POST /list/items ${error}`);
    res
      .status(400)
      .json({ success: false, message: `Err in POST /list/items ${error}` });
  }
}
