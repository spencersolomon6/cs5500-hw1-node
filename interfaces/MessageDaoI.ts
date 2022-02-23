import Message from "../models/messages/Message";
import User2Message from "../models/messages/User2Message";

export default interface MessageDaoI {
    userMessagesUser(uid1: string, uid2: string, message: string): Promise<User2Message>;
    findSentMessages(uid: string): Promise<User2Message[]>;
    findReceivedMessages(uid: string): Promise<User2Message[]>;
    userDeletesMessage(mid: string): Promise<any>;
    userEditsMessage(mid: string, message: string): Promise<Message>;
    findAllMessages(): Promise<User2Message[]>;
}