import User from "../users/User";
import Stats from "./Stats";

/**
 * @typedef Tuit Maintains the data associated with a Tuit
 * @property {string} tuit The content of the Tuit
 * @property {User} postedBy The user who posted the Tuit
 * @property {Date} postedOn The date that the Tuit was posted
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};