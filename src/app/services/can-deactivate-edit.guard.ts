import {CanDeactivate} from '@angular/router';
import {AppComponent} from '../app.component';
import {Injectable} from '@angular/core';
import {EditService} from './edit.service';
import {MdDialog} from '@angular/material';
import {ChangeConfirmComponent} from '../confirm/change-confirm/change-confirm.component';
/**
 * Created by onur on 08.06.17.
 */


@Injectable()
export class CanDeactivateEditGuard implements CanDeactivate<AppComponent> {

  constructor(private editService: EditService, public dialog: MdDialog) {
  }

  canDeactivate() {

    if (this.editService.isInEditMode()) {
      const dialogRef = this.dialog.open(ChangeConfirmComponent);

      dialogRef.afterClosed().subscribe(result => {
        /*if (result === true) {
        }*/
      });
    }

    return !this.editService.isInEditMode();
  }

}
