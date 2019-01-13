import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import { ChatRoomService } from '../services/chatRoom.service';

@Directive({
  selector: '[validateNickname][ngModel],[validateNickname][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NicknameValidator), multi: true }
  ]
})
export class NicknameValidator {

  constructor(private chatRoomService:ChatRoomService) {
 
  }

  validate(input: FormControl) {

    let nickname:string = input.value;

    if (nickname){
        let isValid:boolean = !this.chatRoomService.isNicknameExist(nickname);

        if (!isValid){
            return {validateNickname: true};
        }
    }

    return null; //when the check is valid.
  }
}