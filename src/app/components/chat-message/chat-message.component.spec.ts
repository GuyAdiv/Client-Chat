import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessageComponent } from './chat-message.component';
import { ChatMessage } from 'src/app/models/chatMessage.model';
import { ChatClient } from 'src/app/models/chatClient.model';

describe('Check chat message component.', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;
  let chatUser:ChatClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    chatUser = new ChatClient("UserTest", "rgb(50, 50, 50)")
    component.chatMessage = new ChatMessage(chatUser, "Test message");
    fixture.detectChanges();
  });

  it('should create chat message component.', () => {
    expect(component).toBeTruthy();
  });

  it('should display sender name.', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.msgSenderName').textContent).toEqual('UserTest');
  });

  it('should display client text message', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".msgItemText").textContent).toEqual("Test message")
  });

  it('should display client name in color.', () =>{
    const compiled = fixture.debugElement.nativeElement;
    const userColor = component.chatMessage.sender.color;
    expect(compiled.querySelector(".msgSenderName").style.color).toEqual(userColor);
  });

  it('should not display name when client is message owner.', () =>{
    component.isMsgOwner = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".msgSenderName")).toBeNull();
  });
});