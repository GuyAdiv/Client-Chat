import { Component, OnInit, Input, ViewChild, QueryList } from '@angular/core';
import { ChatClient } from 'src/app/models/chatClient.model';
import { ChatRoomService } from 'src/app/services/chatRoom.service';
import { ChatMessage } from 'src/app/models/chatMessage.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  @ViewChild("chatBox") chatBoxElement;
  @ViewChild("txtUserMsg") txtUserMsgElement;

  @Input("chatClientData") chatClient:ChatClient;
  
  userMessage:string;
  countOnlineUsers:number;
  usersSubscription:Subscription
  chatMessages:ChatMessage[] = [];
  chatMessagesSubscription:Subscription;

  constructor(private chatRoomService:ChatRoomService) { }

  ngOnInit() {

    this.usersSubscription = this.chatRoomService.connectedClientsChanged.subscribe(
      (chatClients:ChatClient[]) => {
        this.countOnlineUsers = chatClients.length;
      }
    );

    this.chatMessagesSubscription = this.chatRoomService.clientsMessagesChanged.subscribe(
      (messages:ChatMessage[]) => {
        this.chatMessages = messages;        
      }
    );

    this.chatMessages = this.chatRoomService.getAllMessages();
    this.countOnlineUsers = this.chatRoomService.getCountOnlineUsers();
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

  onMessageCreated(){
    this.scrollMessageBoxToBottom();
  }

  scrollMessageBoxToBottom(){
    this.chatBoxElement.nativeElement.scrollTop = this.chatBoxElement.nativeElement.scrollHeight;
  }

  userLogout(){
    //console.log("user logout.");

    this.chatRoomService.logoutClient(this.chatClient);
  }

  sendMessage(){

    //console.log("user message: " + this.userMessage);

    let msg:ChatMessage = new ChatMessage(this.chatClient, this.userMessage);
    this.chatRoomService.addNewMessage(msg);
    this.userMessage = "";
    this.txtUserMsgElement.nativeElement.focus();
  }

}
