/**
 * @file Implements mongoose schema for messages
 */

 import mongoose, {Schema} from "mongoose";
 import Message from "../../models/messages/Message";
 
 /**
  * @typedef Message Represents message relationship between two users,
  * as in a user messages another user
  * @property {User} to User receiving the message
  * @property {User} from User sending the message
  * @property {String} message the content of the message
  * @property {Date} sentOn the date this message was sent
  */
 const MessageSchema = new mongoose.Schema<Message>({
     to: {type: Schema.Types.ObjectId, ref: "UserModel"},
     from: {type: Schema.Types.ObjectId, ref: "UserModel"},
     message: {type: String},
     sentOn: {type: Date, default: Date.now},
 }, {collection: "messages"});
 export default MessageSchema;