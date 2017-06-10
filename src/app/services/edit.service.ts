import {Injectable} from '@angular/core';

@Injectable()
export class EditService {
  private editCounter = 0;

  constructor() {
  }

  incrementEdit() {
    this.editCounter++;
  }

  decrementEdit() {
    if (this.editCounter > 0) {
      this.editCounter--;
    }

  }

  resetEdit() {
    this.editCounter = 0;
  }

  isInEditMode(): boolean {
    return this.editCounter > 0;
  }
}
