import express from "express";
import UserController from "../controllers/api/user/UserController";

export default function apiRouter(app: express.Application): void {
    app.get('/test', (req, res) => {
        res.send('Test page');
    });

    app.get('/', (req, res) => {
        res.send('Home page');
    });

    app.get('/api/users/', (req, res) => {
        const userController = new UserController();
        res.send(userController.index());
    })
}
