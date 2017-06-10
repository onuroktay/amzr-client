import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {User} from '../../model/user';
import {UsersService} from '../../services/users.service';
import {MdDialog} from '@angular/material';
import {DeleteConfirmComponent} from '../../confirm/delete-confirm/delete-confirm.component';
import {Subscription} from 'rxjs/Subscription';
import {UserRole} from '../../model/userRole';
import {EditService} from '../../services/edit.service';

@Component({
  selector: 'amzr-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() user: User;

  roles: UserRole[];
  editMode = false;
  subscription: Subscription;

  constructor(private usersService: UsersService,
              public dialog: MdDialog,
              private editService: EditService) {
  }

  ngOnInit() {
    this.roles = this.usersService.getUserRoles();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editUser() {
    this.editService.incrementEdit();
    this.editMode = true;
  }

  deleteUser() {
    if (this.editMode) {
      this.editService.decrementEdit();
    }

    this.usersService.deleteUser(this.user);
  }

  saveUser() {
    this.editService.decrementEdit();
    this.editMode = false;

    this.subscription = this.usersService.saveUser(this.user).subscribe(
      () => {
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteUser();
      }
    });
  }

}
