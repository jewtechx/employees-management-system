const express = require("express")

const admin = express.Router()

const { register, login, getMe } = require("./admin.controller")

const {protect} = require('../../middleware/protect')

admin.post('/',register)
admin.post('/login',login)
admin.get('/me',protect,getMe)

module.exports = admin