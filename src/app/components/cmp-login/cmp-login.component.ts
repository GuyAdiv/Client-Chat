import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatRoomService } from 'src/app/services/chatRoom.service';
import { ChatClient } from 'src/app/models/chatClient.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cmp-login',
  templateUrl: './cmp-login.component.html',
  styleUrls: ['./cmp-login.component.css']
})
export class CmpLoginComponent implements OnInit {

  @ViewChild('usernameElement') username;
  @ViewChild('loginForm') loginForm: NgForm;

  @Output('onSubmitted') submitted = new EventEmitter();

  constructor(private route:ActivatedRoute,
    private router:Router,
    private chatRoomService:ChatRoomService) { }

  ngOnInit() {
    this.username.nativeElement.focus();
  }

  onLogin(){
    
    let chatClient:ChatClient = null;

    if (this.loginForm.valid)
    {
      chatClient = new ChatClient(
        this.loginForm.value.username, 
        this.loginForm.value.usercolor); 

      this.chatRoomService.addNewClient(chatClient);

      this.loginForm.reset();
      this.router.navigate(['./chats']);    
    }

    this.submitted.emit(chatClient);
  }

}
