import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js";


const getTokenFromReq = (req) => {
  if (req.cookies && req.cookies.accessToken) {
    return req.cookies.accessToken
  }
  if (req.headers.authorization && req.headers.authorization.statrsWith("Bearer ")) {
    return req.headers.authorization.split(" ")[1]
  }
  return null
}

export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = getTokenFromReq(req)
  if (!token) { throw new ApiError(401, "No TOken provided") }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
  const user = await User.findById(decoded._id)
  if (!user) {
    throw new ApiError(401, "User not found")
  }

  req.user = user
  next()

})