import {Component, OnInit} from '@angular/core';
import {MessagesService} from '../services/messages.service';
import {MessageType} from '../model/constants';

@Component({
  selector: 'amzr-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message: string;
  msgType: string;

  constructor(private msgService: MessagesService) {
  }

  ngOnInit() {
    this.message = this.msgService.getMessage();
    this.msgType = this.msgService.getMessageType();
  }

  isError(): boolean {
    return this.msgType === MessageType.ERROR;
  }

  isDone(): boolean {
    return this.msgType === MessageType.DONE;
  }

}
