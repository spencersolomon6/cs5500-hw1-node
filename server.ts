import express from 'express';
import TuitController from './controllers/TuitController';
import UserController from './controllers/UserController';
import TuitDao from './daos/TuitDao';
import UserDao from './daos/UserDao';
import mongoose from 'mongoose';
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.listen(process.env.PORT || PORT);

var mongoDB = 'mongodb+srv://admin:adminPassword@cluster0.vq0f4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoDB);

const userController = new UserController(app, UserDao.getInstance());
const tuitController = new TuitController(app, TuitDao.getInstance());