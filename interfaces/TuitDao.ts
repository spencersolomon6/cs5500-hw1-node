import Tuit from "../models/tuits/Tuit";

export default interface TuitDao {
    findAllTuits(): Promise<Tuit[]>;
    findTuitsByUser(uid: string): Promise<Tuit[]>;
    findTuitById(tid: string): Promise<Tuit>;
    createTuit(tuit: Tuit): Promise<any>;
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    deleteTuit(tid: string): Promise<any>;
}