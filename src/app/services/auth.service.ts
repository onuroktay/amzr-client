import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {MessageType, onurTPIConstant} from 'app/model/constants';
import {MessagesService} from './messages.service';


@Injectable()
export class AuthService {
  private username: string;
  private roleValue: number;


  constructor(private http: Http,
              private msgService: MessagesService) {
  }

  login(credentials): Observable<any> {
    const body = JSON.stringify(credentials); // Stringify payload
    const options = new RequestOptions({withCredentials: true});

    return this.http.post(`${onurTPIConstant.URLWS}login`, body, options)
      .map((res: Response) => {
        const response = res.json();

        if (response && response.success) {
          this.username = response.data.username;
          this.roleValue = response.data.roleValue;
        } else {
          this.msgService.setMessage('Wrong login', MessageType.ERROR);
        }

        localStorage.setItem('username', this.username);
        localStorage.setItem('roleValue', this.roleValue.toString(10));

        return response;
      })
      .catch((error: any) => {
        this.msgService.setMessage('Wrong login', MessageType.ERROR);
        return Observable.throw(error.error) || 'Server error';
      });
  }

  // Add new Register
  saveRegister(register): Observable<any> {

    const body = JSON.stringify(register); // Stringify payload
    const headers = new Headers({'Content-Type': 'text/plain'}); // ... Set content type to JSON
    const options = new RequestOptions({headers: headers});

    return this.http.post(onurTPIConstant.URLWS + 'user', body, options) // ...using post request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => {
          this.msgService.setMessage('Sorry, the server doesn\'t respond', MessageType.ERROR);
          return Observable.throw(error.error) || 'Server error';
        }
      ); // ...errors if any
  }

  getUserLocalData() {
    this.username = localStorage.getItem('username');
    this.roleValue = parseInt(localStorage.getItem('roleValue'));
  }

  getUserName(): string {
    if (!this.username) {
      this.getUserLocalData();
    }

    return this.username;
  }

  getUserRole(): number {
    return this.roleValue;
  }

  logout() {
    const options = new RequestOptions({withCredentials: true});

    return this.http.get(onurTPIConstant.URLWS + 'logout', options)
      .map((res: Response) => res.json())
      .catch((error: any) => {
          this.msgService.setMessage('Sorry, the server doesn\'t respond', MessageType.ERROR);
          return Observable.throw(error.error) || 'Server error';
        }
      ); // ...errors if any
  }
}
