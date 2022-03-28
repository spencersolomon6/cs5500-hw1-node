import Tuit from "../models/tuits/Tuit";
import Stats from "../models/tuits/Stats";

/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface TuitDaoI {
    findAllTuits (): Promise<Tuit[]>;
    findAllTuitsByUser (uid: string): Promise<Tuit[]>;
    findTuitById (tid: string): Promise<Tuit>;
    createTuitByUser (uid: string, tuit: Tuit): Promise<Tuit>;
    updateTuit (tid: string, tuit: Tuit): Promise<any>;
    deleteTuit (tid: string): Promise<any>;
    updateLikes (tid: string, newStats: Stats): Promise<any>;
    updateDislikes (tid: string, newStats: Stats): Promise<any>;
};