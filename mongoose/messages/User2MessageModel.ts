import mongoose from "mongoose";
import User2MessageSchema from "./User2MessageSchema";
import User2Message from "../../models/messages/User2Message";

/**
 * A mongoose Model built using the User2MessageSchema
 */
const User2MessageModel = mongoose.model<User2Message>(
    "User2MessageModel",
    User2MessageSchema
);
export default User2MessageModel;
