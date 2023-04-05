import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

export const userModel = mongoose.model('User', userSchema)

export const getUserById = (id, callback) => {
    userModel.findById(id, callback)
}

export const getUserByLogin = (login, callback) => {
    const query = { login: login }
    userModel.findOne(query).then((user)=> {
        callback(user)
    }).catch(err => {
        callback(null, err)
    })
}

export const addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err
            newUser.password = hash
            newUser.save().then(()=>{ callback() })
            .catch((err) => callback(err))
        })
    })
}

export const comparePass = (usrPass, dbPass, callback) => {
    bcrypt.compare(usrPass, dbPass, (err, isMatch) => callback(err, isMatch))
}