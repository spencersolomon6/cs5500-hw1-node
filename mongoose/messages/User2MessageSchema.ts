/**
 * @file implements mongoose schema for user2message resource
 */

 import mongoose, {isValidObjectId, Schema} from "mongoose";
 import { idText } from "typescript";
 import Message from "../../models/messages/Message";
import User2Message from "../../models/messages/User2Message";
 import User from "../../models/users/User";

 /**
  * @typedef User2Message encapsulates the relationship between a User and a Message they sent
  * @property {String} messageId the id of the message
  * @property {User} sentBy the user who sent the message
  * @property {User} sentTo the user who received the message
  */
 const User2MessageSchema = new mongoose.Schema<User2Message>({
     messageId: {type: String, required: true},
     sentBy: {type: Schema.Types.ObjectId, ref: "User"},
     sentTo: {type: Schema.Types.ObjectId, ref: "User"},
 }, {collection: "user2messages"});
 export default User2MessageSchema;