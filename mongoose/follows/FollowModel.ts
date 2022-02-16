import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";
import Follow from "../../models/follows/Follow";

const FollowModel = mongoose.model<Follow>(
    "FollowModel",
    FollowSchema
);
export default FollowModel;
