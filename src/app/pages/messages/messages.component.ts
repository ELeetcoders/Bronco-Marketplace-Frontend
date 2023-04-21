import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  searchControl = new FormControl('')

  users$ = this.UserService.allUsers$

  constructor(public UserService: UserService) {
  }

}
