// require('dotenv').config({path: '/backend/env})
import dotenv from "dotenv"
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/db.js";




connectDB();

/*
One of the ways to connect to database. (ignored this way to make index file less polluted)


import express from "express";
const app = express()

  (async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error", (error) => {
        console.log("ERR : ", error)
        throw error
      })


      app.listen(process.env.PORT, () => {
        console.log(`App is listening on http://localhost:${process.env.PORT}`)
      })
    } catch (error) {
      console.log("Error : ", error)
      throw error
    }
  })() 
*/