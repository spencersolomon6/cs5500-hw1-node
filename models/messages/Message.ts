/**
 * @file Encapsulates the data type representing a message between two users
 */
 import User from '../users/User';

 /**
  * @typedef Message Represents message relationship between two users,
  * as in a user messages another user
  * @property {User} to User receiving the message
  * @property {User} from User sending the message
  * @property {String} message the content of the message
  * @property {Date} sentOn the date this message was sent
  */
 export default interface Message {
     to: User,
     from: User,
     message?: String,
     sentOn?: Date
 }