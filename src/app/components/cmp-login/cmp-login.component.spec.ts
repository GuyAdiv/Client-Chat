import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CmpLoginComponent } from './cmp-login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ChatsBoardComponent } from '../chats-board/chats-board.component';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import { ChatRoomService } from 'src/app/services/chatRoom.service';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatClient } from 'src/app/models/chatClient.model';
import { NicknameValidator } from 'src/app/directives/validateNickname.directive';

describe('Check login user component.', () => {
  let component: CmpLoginComponent;
  let fixture: ComponentFixture<CmpLoginComponent>;
  let chatRoomService: ChatRoomService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CmpLoginComponent,
        ChatsBoardComponent,
        ChatRoomComponent,
        ChatMessageComponent,
        NicknameValidator
       ],
      imports:[
        ReactiveFormsModule, 
        FormsModule,
        AppRoutingModule
      ],
      providers:[
        ChatRoomService
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    chatRoomService = TestBed.get(ChatRoomService);
    fixture = TestBed.createComponent(CmpLoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create login user component.', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {

    fixture.whenStable().then( () => {
      component.loginForm.controls['username'].setValue('');
      expect(component.loginForm.valid).toBeFalsy();
    });

  });

  it('should send user data on submit', () => {

    let testUser:string = "Guy";
    let testColor:string = "#343434";

      component.submitted.subscribe((user:ChatClient) => {
        expect(user.nickname).toEqual(testUser);
        expect(user.color).toEqual(testColor);
    });

    fixture.whenStable().then( () => {
      component.loginForm.controls['username'].setValue(testUser);
      component.loginForm.controls['usercolor'].setValue(testColor);
      component.loginForm.ngSubmit.emit();
    });

  });

  it('should display form error validation when sumbit empty nickname.', () => {

    let testUser:string = "";
    let testColor:string = "#343434";
    let errorMsg:string = "Nickname empty is not valid.";

      component.submitted.subscribe((user:ChatClient) => {

        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        const formErrorMsg = compiled.querySelector(".form-text").textContent;

        expect(formErrorMsg).toEqual(errorMsg);
    });

    fixture.whenStable().then( () => {
      component.loginForm.controls['username'].setValue(testUser);
      component.loginForm.controls['username'].markAsTouched();
      component.loginForm.controls['usercolor'].setValue(testColor);
      component.loginForm.ngSubmit.emit();
    });

  });

  it('should display validation message used nickname.', () => {

    let testUser:string = "Guy";
    let testColor:string = "#343434";
    let validationMsg:string = "Nickname is already in use. type new one.";

    chatRoomService.addNewClient(new ChatClient(testUser, testColor))

    fixture.detectChanges();
    
    fixture.whenStable().then( () => {

      component.loginForm.controls['username'].setValue(testUser);
      component.loginForm.controls['username'].markAsTouched();
      component.loginForm.controls['usercolor'].setValue(testColor);
      component.loginForm.controls['username'].updateValueAndValidity();

      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      expect(component.loginForm.valid).toBeFalsy();
      expect(compiled.querySelector('.form-text').textContent).toEqual(validationMsg);
    
    });

  });

});