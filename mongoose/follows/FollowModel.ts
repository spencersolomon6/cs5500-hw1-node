import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";
import Follow from "../../models/follows/Follow";

/**
 * A mongoose Model built using the FollowSchema
 */
const FollowModel = mongoose.model<Follow>(
    "FollowModel",
    FollowSchema
);
export default FollowModel;
