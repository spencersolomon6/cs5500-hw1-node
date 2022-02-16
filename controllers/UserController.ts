import {Request, Response, Express} from "express";
import UserControllerI from "../interfaces/UserController";
import UserDao from "../daos/UserDao";
import express from 'express';
import User from "../models/User";

export default class UserController implements UserControllerI {
    private static instance: UserController | null = null; 
    private static userDao: UserDao = UserDao.getInstance();

    public static getInstance = (app: Express): UserController => {
        if (UserController.instance === null) {
            UserController.instance = new UserController();

            app.get('/users', UserController.instance.findAllUsers);
            app.get('/users/:userid', UserController.instance.findUserById);
            app.post('/users', UserController.instance.createUser);
            app.delete('/users/:userid', UserController.instance.deleteUser);
            app.put('/users/:userid', UserController.instance.updateUser);
        }

        return UserController.instance;
    }

    private constructor() { }

    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    findUserById = (req: Request, res: Response) =>
    UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    createUser = (req: Request, res: Response) =>
    UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    deleteUser = (req: Request, res: Response) =>
    UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));

    updateUser = (req: Request, res: Response) =>
    UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
}