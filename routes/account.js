import express from 'express';
import { addUser, getUserByLogin, userModel } from '../models/user.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { config } from '../config/database.js';
import { model } from 'mongoose';

const router = express.Router()

// router.get("/reg", (req, res)=>{
//     res.send("<h4>Registration Page!</h4>")
// })

router.post("/reg", (req, res)=>{
    const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login,
        password: req.body.password,
    })
    addUser(newUser, (err, user) => {
        if(!err) res.json({succes: true, msg: "User was added!"})
        else res.json({succes: false, msg: "User is not added!"})
    })
})

// router.get("/auth", (req, res)=>{
//     res.send("<h4>Authentification Page!</h4>")
// })

router.post("/auth", (req, res) => {
    const login = req.body.login
    const password = req.body.password

    getUserByLogin(login, (err, user)=>{
        if(err) throw err
        if(!user) return res.json({succes: false, msg: "User was not found!"})
        
        comparePass(password, user.password, (err, isMatch) => {
            if(err) throw err
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 3600 * 24 // 1 day
                })

                res.json({
                    succes: true,
                    token: 'JWT: ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email
                    }
                })
            }else return res.json({succes: false, msg: "Passwords do not match!"})
        })
    })
})

router.get("/dashboard", passport.authenticate('jwt', {session: false}), (req, res)=>{
    res.send("<h4>Dashboard Page!</h4>")
})

export { router as account }