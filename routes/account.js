import express from 'express';
import { addUser, getUserByLogin, userModel, comparePass } from '../models/user.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { config } from '../config/database.js';

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
        else res.json({succes: false, msg: "User has not been added! " + err.message})
    })
})

// router.get("/auth", (req, res)=>{
//     res.send("<h4>Authentification Page!</h4>")
// })

router.post("/auth", (req, res) => {
    const login = req.body.login
    const password = req.body.password

    getUserByLogin(login, (user, err)=>{
        if(err) return res.json({succes: false, msg: err.message})
        if(!user) return res.json({succes: false, msg: "User was not found!"})
        comparePass(password, user.password, (err, isMatch) => {
            if(err) return res.json({succes: false, msg: err.message})
            if(isMatch){
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: '1h' // 1 day
                })

                res.json({
                    succes: true,
                    token: 'JWT: ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        login: user.login,
                        email: user.email
                    },
                })
            }else return res.json({succes: false, msg: "Passwords don't match!"})
        })
    })
})

// router.get("/dashboard", passport.authenticate('jwt', {session: false}), (req, res)=>{
//     res.send("<h4>Dashboard Page!</h4>")
// })

router.post("/logged", (req, res)=>{
    const token = req.body.token
    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err) res.json({succes: false, msg: err.message})
        else res.json({succes: true, msg: 'Logged!'})
    })
})

export { router as account }