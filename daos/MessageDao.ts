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

    userMessagesUser = async (uid1: string, uid2: string, message: string): Promise<User2Message> =>
        MessageModel.create({message: message})
        .then(m => User2MessageModel.create({messageId: m._id, sentTo: uid2, sentBy: uid1}));

    findSentMessages = async (uid: string): Promise<User2Message[]> =>
        User2MessageModel.find({sentBy: uid}).populate("message", "sentTo", "sentBy").exec();

    findReceivedMessages = async (uid: string): Promise<User2Message[]> =>
        User2MessageModel
        .find({sentTo: uid})
        .populate("message", "sentBy", "sentTo")
        .exec();

    userDeletesMessage = async (mid: string): Promise<any> => 
        User2MessageModel.deleteOne({message: mid})
        .then(__ => MessageModel.deleteOne({messageId: mid}));

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
        .populate("sentTo", "sentBy", "message")
        .exec();
}