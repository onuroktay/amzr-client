import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../model/user';
import {Subscription} from 'rxjs/Subscription';
import {TabType} from '../../model/constants';
import {NavbarService} from '../../services/navbar.service';
import {EditService} from '../../services/edit.service';

@Component({
  selector: 'amzr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[];
  user: User;

  roleValue: Number;

  subscription: Subscription;

  constructor(private usersService: UsersService,
              private navbarService: NavbarService,
              private editService: EditService) {
  }

  ngOnInit() {
    this.navbarService.setSelectedTab(TabType.USERS);

    this.editService.resetEdit();

    this.subscription = this.usersService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

