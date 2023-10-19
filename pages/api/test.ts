import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { conn } from "../../server/configs/db.config";

export default async function testHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json({
      success: true,
      data: {
        message: "Hello from /test",
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: `${error}`,
    });
  }
}
