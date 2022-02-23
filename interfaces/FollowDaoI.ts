import Follow from "../models/follows/Follow";
import User from "../models/users/User";

/**
 * @file Declares CRUD operations for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsUser (followingid: string, followedid: string): Promise<Follow>;
    userUnfollowsUser (followingid: string, followedid: string): Promise<any>;
    findFollow (followingid1: string, followingid2: string): Promise<Follow[]>;
    findFollowing (uid: string): Promise<Follow[]>;
    findFollowedBy (uid: string): Promise<Follow[]>;
    findAllFollows (): Promise<Follow[]>;
};