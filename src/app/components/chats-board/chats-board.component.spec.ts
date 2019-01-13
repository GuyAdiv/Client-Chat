import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ChatsBoardComponent } from './chats-board.component';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatRoomService } from 'src/app/services/chatRoom.service';
import { ChatClient } from 'src/app/models/chatClient.model';

describe('Check chat board component.', () => {
  let component: ChatsBoardComponent;
  let fixture: ComponentFixture<ChatsBoardComponent>;
  let chatRoomService: ChatRoomService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ChatsBoardComponent,
        ChatRoomComponent,
        ChatMessageComponent
       ],
       imports: [
         FormsModule
       ],
       providers: [
         ChatRoomService
       ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    chatRoomService = TestBed.get(ChatRoomService);
    fixture = TestBed.createComponent(ChatsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create chats board.', () => {
    expect(component).toBeTruthy();
  });

  it('should display message info when no users connected.', () =>{
    const compiled = fixture.debugElement.nativeElement;
    const msginfo = "There are no connected users.";
    expect(compiled.querySelector("#messageInfo").textContent).toEqual(msginfo);
  });

  it('check service injection for ChatRoomService.',
        inject([ChatRoomService], (injectService: ChatRoomService) => {
            expect(injectService).toBe(chatRoomService);
        })
    );
  
  it('should display two chat rooms when two clients are online.', () =>{

    chatRoomService.addNewClient(new ChatClient("Guy", "#000000"));
    chatRoomService.addNewClient(new ChatClient("Ami", "#323232"));

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll("app-chat-room").length).toEqual(2);
  });
    
});