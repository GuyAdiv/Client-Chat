import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CmpHeaderComponent } from './cmp-header.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ChatsBoardComponent } from '../chats-board/chats-board.component';
import { CmpLoginComponent } from '../cmp-login/cmp-login.component';
import { ChatRoomService } from 'src/app/services/chatRoom.service';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

describe('Check application header component.', () => {
  let component: CmpHeaderComponent;
  let fixture: ComponentFixture<CmpHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CmpHeaderComponent,
        ChatsBoardComponent,
        CmpLoginComponent,
        ChatRoomComponent,
        ChatMessageComponent
       ],
       imports:[
        AppRoutingModule,
        FormsModule
       ],
       providers:[
        ChatRoomService
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create header component', () => {
    expect(component).toBeTruthy();
  });
});