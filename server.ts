/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, {Request, Response} from 'express';
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from './controllers/FollowController';
import BookmarkController from './controllers/BookmarkController';
import MessageController from './controllers/MessageController';
import mongoose from "mongoose";
import AuthenticationController from './controllers/AuthController';

const session = require('express-session');
const cors = require('cors');

// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME || "admin";
const DB_PASSWORD = process.env.DB_PASSWORD || "adminPassword";
const HOST = "cluster0.vq0f4.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString);

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}));

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

// Configure secure cookies when operating in production
let sess = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUnintialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production",
    }
}

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

// create RESTful Web service API
const courseController = new CourseController(app);
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const followsController = FollowController.getInstance(app);
const bookmarksController = BookmarkController.getInstance(app);
const messagesController = MessageController.getInstance(app);
const authController = AuthenticationController(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;

app.listen(process.env.PORT || PORT);