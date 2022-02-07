import TuitDaoI from "../interfaces/TuitDao";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {

    private static instance: TuitDao;

    private constructor () {};

    public static getInstance(): TuitDao {
        if (!TuitDao.instance) {
            TuitDao.instance = new TuitDao();
        }

        return TuitDao.instance;
    }

    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }
    
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return await TuitModel.findOne({user: uid});
    }
    
    async findTuitById(tid: string): Promise<Tuit> {
        return await TuitModel.findById(tid);
    }
    
    async createTuit(tuit: Tuit): Promise<any> {
        return await TuitModel.create(tuit);
    }
    
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({_id: tid}, {$set: Tuit});
    }
    
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }
}