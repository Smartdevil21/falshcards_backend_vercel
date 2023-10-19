import mongoose, { Schema } from "mongoose";
import { Middleware } from "next/dist/lib/load-custom-routes";
import { NextMiddleware } from "next/server";
import * as validator from "validator";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    validate(email: string) {
      if (!validator.default.isEmail(email)) {
        throw new Error("Email is Invalid!");
      }
    },
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateToken = async function () {
  try {
    const resultantToken = await jwt.sign(
      { _id: this._id.toString() },
      process.env.JWT_KEY as Secret
    );
    await this.save();
    return resultantToken;
  } catch (error) {
    console.log(`Token generation error: ${error}`);
  }
};

userSchema.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    // next();
  } catch (error) {
    console.log(`User.save() error: ${error}`);
  }
});

// console.log(mongoose.models.kanji.modelName);
export const User = mongoose.models.user || mongoose.model("user", userSchema);
