import { Component, OnInit } from '@angular/core';
import { ChatRoomService } from 'src/app/services/chatRoom.service';
import { ChatClient } from 'src/app/models/chatClient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chats-board',
  templateUrl: './chats-board.component.html',
  styleUrls: ['./chats-board.component.css']
})
export class ChatsBoardComponent implements OnInit {

  chatClients:ChatClient[] = [];
  clientsSubscription:Subscription;

  constructor(private chatRoomService:ChatRoomService) { }

  ngOnInit() {

    this.clientsSubscription = this.chatRoomService.connectedClientsChanged.subscribe(
      (chatClients:ChatClient[]) => {
        this.chatClients = chatClients;
      }
    )
    this.chatClients = this.chatRoomService.getConnectedClients();
  }

  ngOnDestroy(): void {
    this.clientsSubscription.unsubscribe();
  }

}
