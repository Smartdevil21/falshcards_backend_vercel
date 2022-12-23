// To get all kanji data based on passed kanji word or meaning

import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../server/configs/db.config";
import { Kanjis } from "../../../server/models/kanji.model";

export default async function searchKanjiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    const result = await Kanjis.find({
      $or: [{ word: req.body.keyword }, { meaning: req.body.keyword }],
    });
    if (!result.length) throw new Error("No results found!");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(`err in POST /kanji/search : ${error}`);
    res.status(400).json({ success: false, message: `${error}` });
  }
}
