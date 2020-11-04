import express from 'express';
import apiRouter from "./router/api";
// Create a new express app instance
const app: express.Application = express();

apiRouter(app);
console.log('app', app);
export default app;
