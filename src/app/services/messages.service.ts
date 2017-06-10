import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessagesService {
  private message: string;
  private msgType: string;
  displayMessage: Subject<string> = new Subject<string>();

  constructor() {
  }

  setMessage(message: string, msgType: string) {
    this.message = message;
    this.msgType = msgType;

    this.displayMessage.next();
  }

  getMessage(): string {
    return this.message;
  }

  getMessageType(): string {
    return this.msgType;
  }

}
