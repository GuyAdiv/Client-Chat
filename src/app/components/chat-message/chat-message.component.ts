import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ChatMessage } from 'src/app/models/chatMessage.model';
import { ChatRootClient } from 'src/app/models/chatClient.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit, AfterViewInit {

  username:string;
  message:string;
  color:string;
  time:number;
  isRootClient:boolean;

  @Input("chatMessage") chatMessage:ChatMessage;
  @Input("isMsgOwner") isMsgOwner:boolean;
  @Output("MessageCreated") messageCreated = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.username = this.chatMessage.sender.nickname;
    this.color = this.chatMessage.sender.color;
    this.message = this.chatMessage.message;
    this.time = this.chatMessage.time;
    this.isRootClient = this.chatMessage.sender instanceof ChatRootClient;
  }

  ngAfterViewInit(): void {
    //console.log("message created");
    this.messageCreated.emit(null);
  }
}
