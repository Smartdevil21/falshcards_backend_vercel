// Get filtered kanjis based on arrays of kanjiWords or levels

import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../server/configs/db.config";
import { Kanjis } from "../../../server/models/kanji.model";

export default async function getKanjis(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await conn();
    const response = await Kanjis.find({
      $or: [
        {
          level: { $in: req.body.level },
        },
        { word: { $in: req.body.items } },
      ],
    });
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log(`Err in POST /kanji/filter ${error}`);
  }
}
