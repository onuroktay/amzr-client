import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, RequestOptions} from '@angular/http';
import {MessageType, onurTPIConstant} from '../model/constants';
import {MessagesService} from './messages.service';

@Injectable()
export class FileImportService {

  constructor(private http: Http, private msgService: MessagesService) {
  }


  fileImport(fileContent: string): void {
    // const body = JSON.stringify(file); // Stringify payload
    const options = new RequestOptions({withCredentials: true});

    this.http.post(`${onurTPIConstant.URLWS}import`, fileContent, options)
      .map(() => true)
      .catch((error: any) => {
        this.msgService.setMessage('Error import', MessageType.ERROR);
        return Observable.throw(error.error) || 'Server error';
      }).subscribe((res) => console.log(res));
  }

}
