import {Component, OnInit} from '@angular/core';
import {MessageComponent} from './message/message.component';
import {MdSnackBar} from '@angular/material';
import {MessagesService} from './services/messages.service';


@Component({
  selector: 'amzr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public snackBar: MdSnackBar,
              private msgService: MessagesService) {
  }

  ngOnInit() {
    // Watch for new message
    this.msgService.displayMessage.subscribe(() => this.openSnackBar());
  }

  openSnackBar() {
    this.snackBar.openFromComponent(MessageComponent, {
      duration: 10000,
    });
  };

}
