import express from "express";
import session from "express-session";
import cors from "cors"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import publicDecrypt from "crypto";
import { config } from "./config/database.js";
import { fileURLToPath } from "url";
import { account } from "./routes/account.js";
import { passportInit } from "./config/passport.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = 3000
const APP = express()

mongoose.connect(config.db)

mongoose.connection.on("connected", ()=>{
    console.log("Connection was started!")
})

mongoose.connection.on("error", (err)=>{
    console.log("Connection not was started: " + err + "!")
})


APP.use(cors())
APP.use(bodyParser.json())
APP.use(express.static(path.join(__dirname, 'public')))
APP.use(passport.initialize())
// APP.use(passport.session())
passportInit(passport)

APP.get("/", (req, res)=>{
    res.send("<h4>Home Page!</h4>")
})
APP.use("/account/", account)
APP.listen(PORT, ()=>{
    console.log("Server has started on port: " + PORT)
})