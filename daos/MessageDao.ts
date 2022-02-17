import { SchemaTypes } from "mongoose";
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

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

    userMessagesUser = async (uid1: string, uid2: string, message: string): Promise<Message> =>
        MessageModel.create({to:uid2, from:uid1, message:message});

    findSentMessages = async (uid: string): Promise<Message[]> =>
        MessageModel
        .find({from: uid})
        .populate("to", "message", "sentOn")
        .exec();

    findReceivedMessages = async (uid: string): Promise<Message[]> =>
        MessageModel
        .find({to: uid})
        .populate("from", "message", "sentOn")
        .exec();

    userDeletesMessage = async (uid1: string, uid2: string): Promise<any> =>
        MessageModel.deleteOne({to: uid2, from: uid1});

    userEditsMessage = async (uid1: string, uid2: string, message: string): Promise<Message> => {
        const filter = {"to": uid2, "from": uid1};
        const update = {
            $set: {"to": uid2, "from": uid1, "message": message},
            $currentDate: {sentOn: true}
        };

        return MessageModel.replaceOne(filter, update);
    }

    findAllMessages = async (): Promise<Message[]> =>
        MessageModel
        .find()
        .populate("to", "from", "message", "sentOn")
        .exec();
}