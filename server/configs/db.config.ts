import mongoose, { Mongoose } from "mongoose";

const mongo_uri = process.env.MONGODB_URI || "";
const db_name = process.env.DB_NAME as string;
// console.log(mongo_uri);

export const conn = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("Connection Successful!");
    return true;
  } catch (error) {
    console.log(`Err in connecting to DB: ${error}`);
    return false;
  }
};
