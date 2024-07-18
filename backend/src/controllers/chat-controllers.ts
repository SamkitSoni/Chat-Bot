import user from "../models/user.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { configureOpenAI } from "../config/openai-config.js";

export const generateChatCompletion = async (req , res , next) => {
    const { message } = req.body;
    try {
        const users = await user.findById(res.locals.jwtData.id);
        if(!users){
            return res.status(401).json({message: "User not registered or Token malfunctioned"});
        }
        const chats = users.chats.map(({role , content}) => ({role, content})) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: "user"});
        users.chats.push({ content: message, role: "user"});

        const config = configureOpenAI();   
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            // model: "Gemini 1.0 Pro",
            model: "GPT-3.5 Turbo",
            messages: chats,
        });
        users.chats.push(chatResponse.data.choices[0].message);
        await users.save();
        return res.status(200).json({chats: users.chats});
    } catch (error) {
        console.log(error);
        console.log("Here is the error and the problem");
        return res.status(500).json({message: "Something Went Wrong"});
    }
    
}

export const sendChatsToUser = async(req, res, next) => {
    try {
        const users = await user.findById(res.locals.jwtData.id);
        if(!users){
            return res.status(401).send("User not registered or Token malfunctioned");
        }

        if(users._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission didn't match");
        }

        return res.status(200).json({
            message: "OK",
            chats: users.chats
        })    
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            cause: error.message,
        });
    }
};

export const deleteChats = async(req, res, next) => {
    try {
        const users = await user.findById(res.locals.jwtData.id);
        if(!users){
            return res.status(401).send("User not registered or Token malfunctioned");
        }

        if(users._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission didn't match");
        }
        //@ts-ignore
        users.chats = [];
        await users.save();

        return res.status(200).json({
            message: "OK"
        })    
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            cause: error.message,
        });
    }
};