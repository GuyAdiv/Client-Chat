import { Subject, from } from 'rxjs';
import { ChatClient, ChatRootClient } from '../models/chatClient.model' 
import { ChatMessage } from '../models/chatMessage.model';

export class ChatRoomService{
    
    chatRoot:ChatRootClient = new ChatRootClient();
    connectedClientsChanged = new Subject<ChatClient[]>();
    private connectedClients: ChatClient[] = [
/*         new ChatClient(
            "Guy",
            "#404040"
            )
        , 
        new ChatClient(
            "Ami",
            "#336699"
            ) */
    ];

    clientsMessagesChanged = new Subject<ChatMessage[]>();
    private clientsMessages:ChatMessage[] = [];

    addNewClient(newClient:ChatClient)
    {
        const countOnlineUsers:number = this.getCountOnlineUsers();
        if (newClient)
        {
            this.connectedClients.push(newClient);
            
            if (countOnlineUsers > 0){
                let msg:string = newClient.nickname + " has joined.";
                this.sendRootMessage(msg);
            }

            this.connectedClientsChanged.next(this.getConnectedClients());
        }
    }

    private removeClientByNickname(nickname:string)
    {
        let isRemoved:boolean = false;
        let index = this.connectedClients.findIndex((client:ChatClient)=>{
            return client.nickname == nickname;
        });

        if (index >= 0)
        {
            isRemoved=true;
            this.connectedClients.splice(index,1); //remove the item
            this.connectedClientsChanged.next(this.getConnectedClients()); //invok the update
        }

        return isRemoved;
    }

    private sendRootMessage(msg:string){

        if (msg){
            this.addNewMessage(new ChatMessage(this.chatRoot, msg));
        }
        
    }

    logoutClient(chatClient:ChatClient)
    {
        let isRemoved:boolean = false;

        if (chatClient){
            let msg = chatClient.nickname + " left.";
            isRemoved = this.removeClientByNickname(chatClient.nickname);
        
            if (isRemoved)
            {
                this.sendRootMessage(msg);
            }
        }
    }

    getConnectedClients(){
        return this.connectedClients.slice(); //return section of all items as a copy;
    }

    getClientByNickname(nickname:string)
    {
        let result = null;
        let mapResult = this.connectedClients.filter(value => {
            if (value.nickname === nickname)
            {
                return value;
            }
        });

        if (mapResult.length > 0)
        {
            result = mapResult[0];
        }

        return result;
    }

    getAllMessages(){
        return this.clientsMessages.slice(); //return all messages as a copy.
    }

    addNewMessage(message:ChatMessage)
    {
        if(message)
        {
            this.clientsMessages.push(message);
            this.clientsMessagesChanged.next(this.getAllMessages());
        }
    }

    getCountOnlineUsers(){
        return this.connectedClients.length;
    }

    isNicknameExist(nickname:string)
    {
        let client = this.getClientByNickname(nickname);
        let isNicknameExist:boolean = client != null;

        return isNicknameExist;
    }
}