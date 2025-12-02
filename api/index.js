const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader')
const multer = require('multer');
const fs = require('fs')
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);
const jwtSecret = 'dfkbcbsdjkansdjkasjnxcacjnaj';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}
));

const uri = process.env.MONGO_URl;
if (!uri) {
  console.error('MONGODB_URI not set');
  process.exit(1);
}

mongoose.set('strictQuery', true); // optional
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 10000, // 10s
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

mongoose.connection.on('error', err => {
  console.error('Mongoose connection error event:', err);
});

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
            jwt.sign({
                email: userDoc.email,
                id: userDoc._id,

            }, jwtSecret, {}, (err, token) => {
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
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ name, email, _id });
        });
    }
    else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', ' ').json(true);
})

app.post('/upload', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: './uploads/' + newName,
    })
    res.json(newName);
})

const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload-comp', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads', ''));
    }
    res.json(uploadedFiles);
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
        })
        res.json(placeDoc);
    })
})

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { id } = userData;
        res.json(await Place.find({ owner: id }));

    })
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
})

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        if (err) throw err;
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price
            })
            await placeDoc.save();
            res.json("ok");
        }
    })
})

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

app.post('/bookings', async (req, res) => {
    const { token } = req.cookies;
    const { place,price, checkIn, checkOut, numberOfGuests, name, phone } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        Booking.create({
            user: userData.id,
            place,
            price,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone
        }).then((bookingDoc) => {
            res.json(bookingDoc);
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
    })
})

function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
            if (err) return reject(err);
            resolve(userData);
        });
    });
}

app.get('/bookings', async (req, res) => {
    await getUserDataFromToken(req).then(userData => {
        Booking.find({ user: userData.id }).populate('place').then(bookingDocs => {
            res.json(bookingDocs);
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
    }).catch(err => {
        console.error(err);
        res.status(401).json({ error: 'Unauthorized' });
    });


})

const path = require('path');

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(process.env.PORT);