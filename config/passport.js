import { config } from "./database.js";
import { userModel } from "../models/user.js"
import { Strategy, ExtractJwt } from "passport-jwt"

export const passportInit = (pass)=>{
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret,
    }
    pass.use(new Strategy(options, (jwt_payload, done)=>{
        userModel.findOne({id: jwt_payload.sub}, (err, user)=>{
            if(err) return done(err, false)
            if(user) return done(null, user)
            else return done(null, false)
        })
    }))
}
