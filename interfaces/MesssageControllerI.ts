import {Request, Response} from 'express';

export default interface MessageControllerI {
    userMessagesUser(req: Request, res: Response): void;
    findSentMessages(req: Request, res: Response): void;
    findReceivedMessages(req: Request, res: Response): void;
    userDeletesMessage(req: Request, res: Response): void;
    userEditsMessage(req: Request, res: Response): void;
    findAllMessages(req: Request, res: Response): void;
}