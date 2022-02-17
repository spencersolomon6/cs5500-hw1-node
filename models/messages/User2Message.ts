import Message from "./Message";
import User from "../users/User";

export default class User2Message {
    private message: Message | null = null;
    private sentBy: User | null = null;
    private sentTo: User | null = null;
}