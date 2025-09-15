// THis model is for the password which user will store in the password storer website.

import mongoose, { Schema } from "mongoose";

const passwordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      rquired: true,
    }
  },
  { timestamps: true }
)

/* encryption is not needed here while saving as it's just for the 
website / frontend saving so we skip those processes. */


export const Password = mongoose.model("Password", passwordSchema);