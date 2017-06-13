import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Item} from '../model/item';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {MessageType, onurTPIConstant} from '../model/constants';
import {ItemSearch} from '../model/itemsearch';
import {MessagesService} from './messages.service';
import {Route, Router} from '@angular/router';

@Injectable()
export class ItemsService {
  private size = 15;
  private limitES = 10000;
  private lastPage = Math.trunc(this.limitES / this.size).toString();

  private total: number;
  private items: Item[] = [];
  private currentPage = 1;
  private currentItem: Item;

  private searchCriteria: ItemSearch = {
    category: '',
    title: '',
    priceFrom: '',
    priceTo: '',
    size: this.size,
    from: 0,
  };

  constructor(private http: Http,
              private msgService: MessagesService,
              private route: Router) {
  }

  setCurrentPage(page: number) {
    this.currentPage = page;

    if (this.currentPage < 1) {
      this.currentPage = 1;
    }

    const from = (this.getCurrentPage() - 1) * this.size;

    if (from + this.size > this.limitES) {
      this.route.navigate(['app', 'items', 'page', this.lastPage]);
    } else {
      this.setPage(this.size, from);
    }
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getFromOfNextPage(): number {
    return this.getCurrentPage() * this.size;
  }

  searchItems(): Observable<Item[]> {
    if (this.searchCriteria && this.searchCriteria.priceFrom) {
      this.searchCriteria.priceFrom = this.searchCriteria.priceFrom.toString();
    }

    if (this.searchCriteria && this.searchCriteria.priceTo) {
      this.searchCriteria.priceTo = this.searchCriteria.priceTo.toString();
    }

    const body = JSON.stringify(this.searchCriteria);
    const options = new RequestOptions({withCredentials: true});

    return this.http.post(onurTPIConstant.URLWS + 'items', body, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => {
        const response = res.json();

        // Empty items list
        for (let j = this.items.length - 1; j >= 0; j--) {
          this.items.splice(j, 1);
        }

        // Total
        this.total = response.data.total;

        // Fill items list with new received elements
        if (response && response.success && response.data && response.data.items) {
          response.data.items.forEach(item => {
            this.items.push(item);
          });
        }

        return this.items;
      })
      .catch((error: any) => {
        this.msgService.setMessage('Sorry, the server doesn\'t respond', MessageType.ERROR);
        return Observable.throw(error.json().error || 'Server error');
      });
  }

  setCurrentItem(item: Item) {
    this.currentItem = item;
  }

  saveItem(item): Observable<Item[]> {
    item.price = parseFloat(item.price);
    if (item.price < 0) {
      item.price = 0;
    }

    const body = JSON.stringify(item); // Stringify payload
    const headers = new Headers({'Content-Type': 'text/plain'}); // ... Set content type to JSON
    const options = new RequestOptions({withCredentials: true, headers}); // Create a request option

    return this.http.put(onurTPIConstant.URLWS + 'item/' + item.id, body, options) // ...using post request
      .map((res: Response) => {
        const resp = res.json();

        // Get ID of item
        let id;
        if (resp && resp.data && resp.data.id) {
          id = resp.data.id;
        } else {
          return;
        }

        // Get index of item
        const index = this.getIndex(resp.data.id);

        if (index === -1) {
          // New
          this.items.push(item);
        } else {
          this.items[index] = item;
        }
        if (id) {
          this.msgService.setMessage('The item  has been modified successfully', MessageType.DONE);
        }

        return id;
      }) // ...and calling .json() on the response to return data
      .catch((error: any) => {
        this.msgService.setMessage('The item can\'t be modified!', MessageType.ERROR);
        return Observable.throw(error.json().error || 'Server error');
      }); // ...errors if any
  }

  getIndex(id: string): number {
    const max = this.items.length;

    for (let index = 0; index < max; index++) {
      if (this.items[index].id === id) {
        return index;
      }
    }

    return -1;
  }


  delete(item: Item) {
    const options = new RequestOptions({withCredentials: true}); // Create a request option

    this.http.delete(onurTPIConstant.URLWS + 'item/' + item.id, options)
      .catch((error: any) => {
        this.msgService.setMessage('The item has not been deleted!', MessageType.ERROR);
        return Observable.throw(error.json().error || 'Server error');
      })
      .subscribe(
      resp => {
        const response = resp.json();

        if (response && response.success) {
          // Delete locally
          for (let j = 0; j < this.items.length; j++) {
            if (this.items[j].id === item.id) {
              this.items.splice(j, 1);
            }
          }
        }
        if (response && response.success) {
          this.msgService.setMessage('The item  has been deleted successfully', MessageType.DONE);
        }

        if (response && response.success === false) {
          this.msgService.setMessage('The item has not been deleted!', MessageType.ERROR);
        }
      }
    );
  }

  nextPage() {
    this.setCurrentPage(this.currentPage + 1);
  }

  previousPage() {
    this.setCurrentPage(this.currentPage - 1);
  }

  setCriteria(searchCriteria: ItemSearch) {
    this.searchCriteria.category = searchCriteria.category;
    this.searchCriteria.title = searchCriteria.title;
    this.searchCriteria.priceFrom = searchCriteria.priceFrom;
    this.searchCriteria.priceTo = searchCriteria.priceTo;
  }

  setPage(size: number, from: number) {
    this.searchCriteria.size = size;
    this.searchCriteria.from = from;
  }

  getCriteria(): ItemSearch {
    return this.searchCriteria;
  }

  getTotal(): number {
    return this.total;
  }

  reset() {
    this.searchCriteria.category = '';
    this.searchCriteria.title = '';
    this.searchCriteria.priceFrom = '0';
    this.searchCriteria.priceTo = '0';

    this.setCurrentPage(1);
    this.searchItems().subscribe(
      () => {
        this.goToFirstPage();
      }
    );
  }

  goToFirstPage() {
    this.setCurrentPage(1);
    this.route.navigate(['app', 'items', 'page', 1]);
  }

}
