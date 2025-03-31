const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = 'dfkbcbsdjkansdjkasjnxcacjnaj';

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}
));

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
    res.json('Test ok');
});

app.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;

    try {
        const userDoc = await User.create({
            name,
            email,
            pass: bcrypt.hashSync(pass, bcryptSalt)
        })

        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    const userDoc = await User.findOne({ email })
    if (userDoc) {
        const passOk = bcrypt.compareSync(pass, userDoc.pass);
        if (passOk) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            })
        } else {
            res.status(422).json("Invalid password");
        }
    } else {
        res.json("Not found");
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret,{}, (err, user)=>{
            if(err) throw err;
            res.json(user);
        });
    }
    else{

        res.json(null);
    }
});

app.listen(4000);