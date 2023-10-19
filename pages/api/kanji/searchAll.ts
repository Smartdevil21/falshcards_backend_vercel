// To get all kanji data based on passed kanji word or meaning

import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../server/configs/db.config";
import { Kanjis } from "../../../server/models/kanji.model";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    if (!req.body.search) throw new Error("Search term not found in request!");
    await conn();
    const regex = { $regex: req.body.search, $options: "i" };
    const query = {
      $or: [
        { word: regex },
        { meaning: regex },
        { "on_reading.reading": regex },
        { "on_reading.example.eg": regex },
        { "on_reading.example.meaning": regex },
        { "on_reading.example.pronounciation": regex },
        { "kun_reading.reading": regex },
        { "kun_reading.example.eg": regex },
        { "kun_reading.example.meaning": regex },
        { "kun_reading.example.pronounciation": regex },
      ],
    };
    const result = await Kanjis.find(query);
    if (!result.length) throw new Error("No results found!");
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(`err in POST /kanji/search : ${error}`);
    res.status(400).json({ success: false, message: `${error}` });
  }
}
