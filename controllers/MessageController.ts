import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MesssageControllerI";

/**
 * @file Exposes RESTful API endpoints for the message resource.
 * Exposes the following HTTP endpoints:
 * <ul>
 *      <li> POST /api/messages/:uid/users/:uid to send a message from one user to another, with the message in the JSON body
 *      </li>
 *      <li> GET /api/messages/:uid/users to get all messages a user has sent
 *      </li>
 *      <li> GET /api/messages/:uid to get all messages received by this user
 *      </li>
 *      <li> DELETE /api/messages/:mid to delete a message between two users
 *      </li>
 *      <li> PUT /api/messages/:mid to edit a message
 *      </li>
 *      <li> GET /api/messages to get all messages in the system
 *      </li>
 * </ul>
 * @property {MessageController} instance Singleton Controller implementing RESTful API endpoints for message resource
 * @property {MessageDao} messageDao Singleton DAO implementing CRUD operations for message resource
 */
export default class MessageController implements MessageControllerI {
    private static instance: MessageController | null = null;
    private static messageDao: MessageDao = MessageDao.getInstance();

    /**
     * Returns a Singleton instance of the MessageController which supplies RESTful API implementations for the message resource
     * @param app Express instance to implement API
     * @returns MessageController instance
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.instance === null) {
            MessageController.instance = new MessageController();

            app.post("/api/messages/:uid1/users/:uid2", MessageController.instance.userMessagesUser);
            app.get("/api/messages/:uid/users", MessageController.instance.findSentMessages);
            app.get("/api/messages/:uid", MessageController.instance.findReceivedMessages);
            app.delete("/api/messages/:mid", MessageController.instance.userDeletesMessage);
            app.put("/api/messages/:mid", MessageController.instance.userEditsMessage);
            app.get("/api/messages", MessageController.instance.findAllMessages);
        }

        return MessageController.instance;
    } 

    /**
     * Records that a user messaged another user
     * @param {Request} req Represents request from client, including the path
     * parameter uid1 representing the user sending the message and
     * uid2 representing the user receiving the message, with the message 
     * contained within the request body
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new Message object
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uid1, req.params.uid2, req.body)
            .then(message => res.json(message));

    /**
     * Retreive all messages sent by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user making the request
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Message objects
     */
    findSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findSentMessages(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retreive all messages recieved by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user making the request
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Message objects
     */            
    findReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findReceivedMessages(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * User deletes a message
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the message being deleted
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the status of the delete operation
     */        
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.json(status));

    /**
     * Update a message between two users
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the message to be edited, and a new edited 
     * message in the body of the request.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the updated Message object
     */            
    userEditsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userEditsMessage(req.params.mid, req.body)
            .then(message => res.json(message));
    
    /**
     * Retreive all messages in the system
     * @param {Request} req Represents request from clientt
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing an array of Message objects
     */
    findAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessages()
            .then(messages => res.json(messages));
}