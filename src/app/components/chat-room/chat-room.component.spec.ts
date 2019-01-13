import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ChatRoomComponent } from './chat-room.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { FormsModule } from '@angular/forms';
import { ChatRoomService } from 'src/app/services/chatRoom.service';
import { ChatClient } from 'src/app/models/chatClient.model';

describe('Check chat room component.', () => {
  let component: ChatRoomComponent;
  let fixture: ComponentFixture<ChatRoomComponent>;
  let chatRoomService: ChatRoomService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
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

    chatRoomService = TestBed.get(ChatRoomService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomComponent);
    component = fixture.componentInstance;
    component.chatClient = new ChatClient("Guy", "#3C3C3C");
    fixture.detectChanges();
  });

  it('should create chat room component', () => {
    expect(component).toBeTruthy();
  });

  it('check service injection for ChatRoomService.',
        inject([ChatRoomService], (injectService: ChatRoomService) => {
            expect(injectService).toBe(chatRoomService);
        })
    );
  
  it('should display waiting message, when one user is online.', () =>{
    chatRoomService.addNewClient(new ChatClient("Guy", "#000000"));

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const msg = "Waiting for more people to join."
    expect(compiled.querySelector("#waitingMsg").textContent).toEqual(msg);
  });

  it('should not display waiting message, when more than one user is online.', () =>{
    chatRoomService.addNewClient(new ChatClient("Guy", "#000000"));
    chatRoomService.addNewClient(new ChatClient("Ami", "#323232"));

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("#waitingMsg")).toEqual(null);
  });

  it('should display count of users online.', () =>{
    chatRoomService.addNewClient(new ChatClient("Guy", "#000000"));
    chatRoomService.addNewClient(new ChatClient("Ami", "#323232"));
    chatRoomService.addNewClient(new ChatClient("Mor", "#A7A7A7"));

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const displayedCountUsers = parseInt(compiled.querySelector("#countOnlineUsers").textContent)
    expect(displayedCountUsers).toEqual(chatRoomService.getCountOnlineUsers());
  });

});