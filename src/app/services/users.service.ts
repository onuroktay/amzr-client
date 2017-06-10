import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {MessageType, onurTPIConstant, UserType} from '../model/constants';
import {MessagesService} from './messages.service';
import {UserRole} from '../model/userRole';


@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private http: Http, private msgService: MessagesService) {
  }

  getUsers(): Observable<User[]> {
    const options = new RequestOptions({withCredentials: true});

    return this.http.get(onurTPIConstant.URLWS + 'users', options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => {
        const response = res.json();

        // Empty items list
        for (let j = this.users.length - 1; j >= 0; j--) {
          this.users.splice(j, 1);
        }

        // Fill items list with new received elements
        if (response && response.success && response.data) {
          response.data.forEach(user => {
            this.users.push(user);
          });

          // Sort User by name
          this.users.sort(function (a: User, b: User) {
            if (a.username < b.username) {
              return -1;
            }

            if (a.username > b.username) {
              return 1;
            }

            return 0;
          });
        }

        return this.users;
      })
      .catch((error: any) => {
        this.msgService.setMessage('Sorry, impossible to read the data on the server!', MessageType.ERROR);
        return Observable.throw(error.json().error || 'Server error');
      });
  }

  deleteUser(user: User) {
    const options = new RequestOptions({withCredentials: true}); // Create a request option

    this.http.delete(onurTPIConstant.URLWS + 'user/' + user.id, options)
      .catch((error: any) => {
        this.msgService.setMessage('Sorry, the user can\'t be deleted!', MessageType.ERROR);
        return Observable.throw(error.json().error || 'Server error');
      })
      .subscribe(
        resp => {
          const response = resp.json();

          if (response && response.success) {
            // Delete locally
            for (let j = 0; j < this.users.length; j++) {
              if (this.users[j].id === user.id) {
                this.users.splice(j, 1);
              }
            }
          }

          if (response) {
            if (response.success) {
              this.msgService.setMessage('The user role has been deleted successfully', MessageType.DONE);
            } else {
              this.msgService.setMessage('The user  has not been deleted!', MessageType.DONE);
            }
          }
        }
      );
  }

  saveUser(user): Observable<User> {
    const body = JSON.stringify(user); // Stringify payload
    const headers = new Headers({'Content-Type': 'text/plain'}); // ... Set content type to JSON
    const options = new RequestOptions({withCredentials: true, headers}); // Create a request option

    return this.http.put(onurTPIConstant.URLWS + 'user/' + user.id + '/' + user.roleValue, body, options) // ...using post request
      .map((res: Response) => {
        const id = res.json();

        if (id) {
          this.msgService.setMessage('The user role has been modified successfully', MessageType.DONE);
        }

        return id;
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => {
        this.msgService.setMessage('The user role has not been modified!', MessageType.ERROR);
        return Observable.throw(error.json().error || 'Server error');
      }); // ...errors if any
  }

  getUserRoles(): UserRole[] {
    return <UserRole[]>[
      {roleName: 'User', roleValue: UserType.USER},
      {roleName: 'Redactor', roleValue: UserType.EDITOR},
      {roleName: 'Admin', roleValue: UserType.ADMIN},
    ];
  }
}


