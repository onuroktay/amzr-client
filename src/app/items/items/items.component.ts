import {Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from '../../model/item';
import {ItemsService} from '../../services/items.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ItemSearch} from '../../model/itemsearch';
import {NavbarService} from '../../services/navbar.service';
import {MessageType, TabType} from '../../model/constants';
import {EditService} from '../../services/edit.service';
import {FileImportService} from '../../services/file-import.service';
import {MessagesService} from "../../services/messages.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'amzr-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnDestroy {
  items: Item[];
  item: Item;
  searchCriteria: ItemSearch;

  columns = 3;

  // color = 'primary';
  // mode = 'Indeterminate';
  // value = 75;

  browserHeight: number = window.innerHeight;
  browserWidth: number = window.innerWidth;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;

  constructor(private itemsService: ItemsService,
              private route: ActivatedRoute,
              private router: Router,
              private navbarService: NavbarService,
              private editService: EditService,
              private msgService: MessagesService,
              private fileImportService: FileImportService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.navbarService.setSelectedTab(TabType.ITEMS);
    this.searchCriteria = this.itemsService.getCriteria();

    this.editService.resetEdit();

    // Watch for change in params
    this.sub1 = this.route.params.subscribe(
      (params => {
          this.sub2 = this.itemsService.searchItems().subscribe(
            items => {
              this.items = items;
            });
        }
      )
    );

    this.defineNbColumns();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }

    if (this.sub2) {
      this.sub2.unsubscribe();
    }

    if (this.sub3) {
      this.sub3.unsubscribe();
    }

    if (this.sub4) {
      this.sub4.unsubscribe();
    }
  }

  onSelectItem(item: Item): void {
    this.itemsService.setCurrentItem(item);
    this.item = item;
  }

  // next pagination items
  next() {
    this.itemsService.nextPage();
    this.router.navigate(['app', 'items', 'page', this.itemsService.getCurrentPage()]);
  }


  // previous pagination items
  previous() {
    this.itemsService.previousPage();
    this.router.navigate(['app/items/page/' + this.itemsService.getCurrentPage()]);
  }

  // disable  previous button if page < 2
  disabledPreviousButton() {
    if (this.itemsService.getCurrentPage() < 2) {
      return true;
    }
  }

  // calcul scroll height
  getStyleScrollHeight() {
    return (this.browserHeight - 220) + 'px';
  }

  // calcul browser size
  onResize(event) {
    this.browserHeight = event.target.innerHeight;
    this.browserWidth = event.target.innerWidth;

    this.defineNbColumns();
  }

  defineNbColumns() {
    if (this.browserWidth > 1440) {
      this.columns = 3;
    } else {
      if (this.browserWidth > 1000) {
        this.columns = 2;
      } else {
        this.columns = 1;
      }
    }
  }

  isNextPageActive(): boolean {
    return this.itemsService.getTotal() - this.itemsService.getFromOfNextPage() > 0;
  }

  changeListener() {
    let reader: FileReader = new FileReader();
    const self = this;

    reader.onloadend = function (e) {
      self.fileImportService.fileImport(reader.result);
    };

    // Check if file is json
    if (event.target['files'] && event.target['files'][0] && event.target['files'][0].name.indexOf('.json') > 0) {
      reader.readAsText(event.target['files'][0], 'ISO-8859-1');
    } else {
      this.msgService.setMessage('Sorry, only json is supported!', MessageType.ERROR);
    }
  }

  getUserRole(): number {
    return this.authService.getUserRole();
  }

}
