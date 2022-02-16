import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";
import Message from "../../models/messages/Message";

const MessageModel = mongoose.model<Message>(
    "MessageModel",
    MessageSchema
);
export default MessageModel;
