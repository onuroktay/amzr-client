import {Component, OnInit} from '@angular/core';
import {ItemsService} from '../../services/items.service';
import {ItemSearch} from '../../model/itemsearch';
import {EditService} from '../../services/edit.service';
import {MdDialog} from '@angular/material';
import {ChangeConfirmComponent} from '../../confirm/change-confirm/change-confirm.component';

@Component({
  selector: 'amzr-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {

  searchCriteria: ItemSearch;
  error: any;

  constructor(private itemsService: ItemsService,
              private editService: EditService,
              public dialog: MdDialog) {
  }

  ngOnInit() {
    this.searchCriteria = this.itemsService.getCriteria();
  }

  search() {
    if (this.checkEditMode()) {
      this.itemsService.searchItems().subscribe(
        () => {
          this.itemsService.goToFirstPage();
        }
      )
    }
  }

  reset() {
    if (this.checkEditMode()) {
      this.itemsService.reset();
    }
  }

  getTotal(): number {
    return this.itemsService.getTotal();
  }

  checkEditMode(): boolean {
    const editMode = this.editService.isInEditMode();

    if (editMode) {
      const dialogRef = this.dialog.open(ChangeConfirmComponent);

      dialogRef.afterClosed().subscribe(result => {
        /*if (result === true) {
         }*/
      });
    }

    return !editMode;
  }
}
