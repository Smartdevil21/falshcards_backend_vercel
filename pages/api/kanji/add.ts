// For adding new kanjis to database

import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../server/configs/db.config";
import { Kanjis } from "../../../server/models/kanji.model";
import { arrayToObjectForKanjiWordData } from "../../../typings/helpers/arrayToObject";

export default async function addKanjiHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    if (method === "OPTIONS") {
      return res.status(200).send("ok");
    }
    await conn();
    const kanjis = await Kanjis.find();
    const kanjisObj = arrayToObjectForKanjiWordData(kanjis);
    if (req.body.word in kanjisObj) throw new Error("Kanji already exists!");
    const result = await new Kanjis(req.body).save();
    res.status(201).json({ success: true, data: result });
  } catch (e) {
    console.log("Err at POST /kanjis/add", e);
    res.status(400).json({ success: false, message: `${e}` });
  }
}
