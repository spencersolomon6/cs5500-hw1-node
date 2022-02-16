import FollowDaoI from "../interfaces/FollowDaoI";
import Follow from "../models/follows/Follow";
import express from "express";
import FollowModel from "../mongoose/follows/FollowModel";


export default class FollowDao implements FollowDaoI {

    private static instance: FollowDao | null = null;

    public static getInstance(): FollowDao {
        if (FollowDao.instance === null) {
            FollowDao.instance = new FollowDao();
        }

        return FollowDao.instance;
    }

    private constructor() { }

    userFollowsUser = async (followingid: string, followedid: string): Promise<Follow> =>
        FollowModel
        .create({userFollowed: followedid, userFollowing: followingid});

    userUnfollowsUser = async (followingid: string, followedid: string): Promise<any> =>
        FollowModel
        .deleteOne({userFollowed:followedid, userFollowing: followingid});
    
    findBothFollowing = async (followingid1: string, followingid2: string): Promise<Follow[]> =>
        FollowModel
        .find({userFollowed: followingid1})
        .find({userFollowed: followingid2})
        .populate("userFollowing")
        .exec();    
    
    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
        .find({userFollowed: uid})
        .populate("userFollowing")
        .exec();


    findAllFollowedBy = async (uid: string): Promise<Follow[]> =>
        FollowModel
        .find({userFollowing:uid})
        .populate("userFollowed")
        .exec();
    

    findAllFollows = async (): Promise<Follow[]> =>
        FollowModel
        .find()
        .populate("userFollowed", "userFollowing")
        .exec();
}