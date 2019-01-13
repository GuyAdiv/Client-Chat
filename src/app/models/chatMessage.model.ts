import { ChatClient } from "./chatClient.model";

export class ChatMessage{
    public sender:ChatClient;
    public message:string;
    public time:number;

    constructor(sender:ChatClient, message:string)
    {
        this.sender = sender;
        this.message = message;
        this.time = Date.now();
    }
}