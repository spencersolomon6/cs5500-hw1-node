/**
 * @file Implements mongoose schema for messages
 */

 import mongoose from "mongoose";
 import Message from "../../models/messages/Message";
 import User from "../../models/User";
 
 /**
  * @typedef Message Represents message relationship between two users,
  * as in a user messages another user
  * @property {User} to User receiving the message
  * @property {User} from User sending the message
  * @property {String} message the content of the message
  * @property {Date} sentOn the date this message was sent
  */
 const MessageSchema = new mongoose.Schema<Message>({
     to: User,
     from: User,
     message: String,
     sentOn: Date
 }, {collection: "messages"});
 export default MessageSchema;