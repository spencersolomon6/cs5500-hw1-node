/**
 * @file Encapsulates the data type representing a message between two users
 */
 import User from '../users/User';

 /**
  * @typedef Message Represents message relationship between two users,
  * as in a user messages another user
  * @property {String} message the content of the message
  * @property {Date} sentOn the date this message was sent
  */
 export default interface Message {
     message: String,
     sentOn?: Date
 }