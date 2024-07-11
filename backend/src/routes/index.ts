import { Router } from "express";
import userRouter from "./user.js";
import chatRouter from "./chats.js";

const appRouter = Router();

appRouter.use("/users" , userRouter);
appRouter.use("/chats" , chatRouter);

export default appRouter;