import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../model/item';
import {ItemsService} from '../../services/items.service';
import {MdDialog} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {DeleteConfirmComponent} from '../../confirm/delete-confirm/delete-confirm.component';
import {EditService} from '../../services/edit.service';

@Component({
  selector: 'amzr-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;

  editMode = false;

  constructor(private itemsService: ItemsService,
              public dialog: MdDialog,
              private authService: AuthService,
              private editService: EditService) {
  }

  ngOnInit() {
  }

  edit() {
    this.editService.incrementEdit();
    this.editMode = true;
  }

  save() {
    this.editMode = false;
    this.editService.decrementEdit();

    this.itemsService.saveItem(this.item).subscribe(
      () => {
      }
    );
  }

  delete() {
    if (this.editMode) {
      this.editService.decrementEdit();
    }

    this.itemsService.delete(this.item);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: this.item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete();
      }
    });
  }

  getUserRole(): number {
    return this.authService.getUserRole();
  }

}
