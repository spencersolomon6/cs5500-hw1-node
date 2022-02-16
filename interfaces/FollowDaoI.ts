import Follow from "../models/follows/Follow";
import User from "../models/users/User";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsUser (followingid: string, followedid: string): Promise<Follow>;
    userUnfollowsUser (followingid: string, followedid: string): Promise<any>;
    findBothFollowing (followingid1: string, followingid2: string): Promise<Follow[]>;
    findAllFollowing (uid: string): Promise<Follow[]>;
    findAllFollowedBy (uid: string): Promise<Follow[]>;
    findAllFollows (): Promise<Follow[]>;
};