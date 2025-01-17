import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;
        let gotConversation = await Conversation.findOne({
            participants : {$all : [senderId,receiverId]}
        })
        if(!gotConversation){
            gotConversation = await Conversation.create({
                particiapnts : [senderId,receiverId]
            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        }
        await gotConversation.save();
        return res.status(200).json({
            message : "Message sent successfully !!!",
            success : true
        })
        //socket io 

    } catch (error) {
        console.log(error);
        
    }
}