import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

 /**
  * @typedef Dislike Represents dislike relationship between a user and a tuit,
  * as in a user dislikes a tuit
  * @property {Tuit} tuit tuit which is being disliked
  * @property {User} dislikedBy User disliking the tuit
  */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;