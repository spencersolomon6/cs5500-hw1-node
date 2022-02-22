import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";
import Message from "../../models/messages/Message";

/**
 * A mongoose Model built using the MessageSchema
 */
const MessageModel = mongoose.model<Message>(
    "MessageModel",
    MessageSchema
);
export default MessageModel;
