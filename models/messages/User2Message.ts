import Message from "./Message";
import User from "../users/User";

/**
 * @typedef User2Message encapsulates the relationship between 
 * two users and a message sent between them
 * @property {Message} message The message that was sent between the users
 * @property {User} sentBy The user who sent the message
 * @property {User} sentTo The user who recieved the message
 */
export default class User2Message {
    private message: Message | null = null;
    private sentBy: User | null = null;
    private sentTo: User | null = null;
}