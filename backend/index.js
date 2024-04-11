const PORT = 9001
const URLDB = 'mongodb://localhost:27017'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')
const User = require('./model/User')
const Product = require("./model/Products")

const app = express()

app.use(cors())
app.use(express.json())

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

app.post('/registration', async (req, res) => {
   
    const {login, password, email} = req.body // или const login= req.body.login и т.д.//
    const user = new User({login, password, email})
    try {
        await user.save()
    } catch (err) {
        if (err && err.code !== 11000) {
            res.json({
                message: 'Ошибка.'
            })
                .status(500)

            return
        }

        //duplicate key
        if (err && err.code === 11000) {
            res.json({
                message: 'Пользователь с таким Логином или Email уже существует'
            })
                .status(400)
            console.error('Не используйте повторно эти данные!')

            return
        }
    }
    console.log(req.body)
    res.json({
        message: 'Вы успешно зарегестрировались!'
    })

})

app.post('/login', async (req, res) => {
    console.log(req.body)
    const {login, password} = req.body
    const user = await User.findOne({login})
    if (!user) {
        return res.status(400).json( {message: 'Не верный логин или пароль!'}
    )
    }
    if(user.password !== password){
        return res.status(400).json( {message: 'Не верный логин или пароль!2'}
    )
    }

    const token = generateAccessToken(user._id)

    res.json({
        message: 'Вы успешно авторизовались!2',
        token: token
    })

})

app.get('/products', async (req, res) => {
    /*const products = [
        {id:1, header: 'Товар 1', price: 120},
        {id:2, header: 'Товар 2', price: 45645},
        {id:3, header: 'Товар 3', price: 665},
        {id:4, header: 'Товар 4', price: 331},
        {id:5, header: 'Товар 5', price: 2123},
        {id:6, header: 'Товар 6', price: 76756},
        {id:7, header: 'Товар 7', price: 331},
        {id:8, header: 'Товар 8', price: 2123}
    ]*/
    const products =  await Product.find()


    res.json({
        data: products
    })

})

app.post('/addproduct', async (req, res) => {
   
    const {header, price, images} = req.body 
    const addproduct = new Product({header, price, images})
    try {
        await addproduct.save()
    } catch (err) {
        if (err && err.code !== 11000) {
            res.json({
                message: 'Ошибка.'
            })
                .status(500)

            return
        }
        
    }
    res.json({
        message: 'Вы успешно добавили товар!'
    })

})



const start = async () => {
    try {
        await mongoose.connect(URLDB, {authSource: "admin"})
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте `))
    } catch (e) {
        console.log(e)
    }
}

start()