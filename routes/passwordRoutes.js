import express from "express"
import { Password } from "../models/Password.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { requireAuth } from "../middleware/requireAuth.js"

const router = express.Router()

// Create password
router.post("/", requireAuth, asyncHandler(async (req, res) => {
  const { website, username, password } = req.body
  if (!website || !username || !password) throw new ApiError(400, "All fields required")
  const saved = await Password.create({ userId: req.user._id, website, username, password })
  return res.json(new ApiResponse(201, saved, "Password saved"))
}))

// Get all passwords for user
router.get("/", requireAuth, asyncHandler(async (req, res) => {
  const passwords = await Password.find({ userId: req.user._id })
  return res.json(new ApiResponse(200, passwords, "Passwords fetched"))
}))

// Update password
router.put("/:id", requireAuth, asyncHandler(async (req, res) => {
  const { website, username, password } = req.body
  const updated = await Password.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { website, username, password },
    { new: true }
  )
  if (!updated) throw new ApiError(404, "Password not found")
  return res.json(new ApiResponse(200, updated, "Password updated"))
}))

// Delete password
router.delete("/:id", requireAuth, asyncHandler(async (req, res) => {
  const deleted = await Password.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
  if (!deleted) throw new ApiError(404, "Password not found")
  return res.json(new ApiResponse(200, deleted, "Password deleted"))
}))

export default router