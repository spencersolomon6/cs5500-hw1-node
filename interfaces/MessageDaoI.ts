import Message from "../models/messages/Message";

export default interface MessageDaoI {
    userMessagesUser(uid1: string, uid2: string, message: string): Promise<Message>;
    findSentMessages(uid: string): Promise<Message[]>;
    findReceivedMessages(uid: string): Promise<Message[]>;
    userDeletesMessage(uid1: string, uid2: string): Promise<any>;
    userEditsMessage(uid1: string, uid2: string, message: string): Promise<Message>;
    findAllMessages(): Promise<Message[]>;
}