import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";
import User2MessageModel from "../mongoose/messages/User2MessageModel";
import User2Message from "../models/messages/User2Message";

/**
 * @file Implements the CRUD operations for the message resource
 */
export default class MessageDao implements MessageDaoI {
    private static instance: MessageDao | null = null;

    public static getInstance(): MessageDao {
        if (MessageDao.instance === null) {
            MessageDao.instance = new MessageDao();
        }

        return MessageDao.instance;
    }

    private constructor() { }

    userMessagesUser = async (uid1: string, uid2: string, message: string): Promise<User2Message> => {
        const m = await MessageModel.create({to:uid2, from:uid1, message:message});
        return User2MessageModel.create({messageId: m, sentTo: uid2, sentBy: uid1});
    }
        

    findSentMessages = async (uid: string): Promise<User2Message[]> =>
        User2MessageModel.find({sentBy: uid}).populate("messageId", "sentTo").exec();

    findReceivedMessages = async (uid: string): Promise<User2Message[]> =>
        User2MessageModel
        .find({sentTo: uid})
        .populate("message", "sentBy")
        .exec();

    userDeletesMessage = async (mid: string): Promise<any> => {
        const s = await User2MessageModel.deleteOne({message: mid});
        MessageModel.deleteOne({messageId: mid});
    }
        

    userEditsMessage = async (mid: string, message: string): Promise<User2Message> => {
        const filter = {"message": mid};
        const update = {
            message: {
                $set: {"message": message},
                $currentDate: {sentOn: true}
            }
        };

        return User2MessageModel.replaceOne(filter, update);
    }

    findAllMessages = async (): Promise<User2Message[]> =>
        User2MessageModel
        .find()
        .populate("sentT", "sentBy", "message")
        .exec();
}