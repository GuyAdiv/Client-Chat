import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CmpHeaderComponent } from './components/cmp-header/cmp-header.component';
import { CmpLoginComponent } from './components/cmp-login/cmp-login.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatsBoardComponent } from './components/chats-board/chats-board.component';

import { ChatRoomService } from './services/chatRoom.service';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { NicknameValidator } from './directives/validateNickname.directive';

@NgModule({
  declarations: [
    AppComponent,
    CmpHeaderComponent,
    CmpLoginComponent,
    ChatRoomComponent,
    ChatsBoardComponent,
    ChatMessageComponent,
    NicknameValidator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ChatRoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
