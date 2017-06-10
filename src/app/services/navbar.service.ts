import { Injectable } from '@angular/core';
import {Tab} from '../model/tab';

@Injectable()
export class NavbarService {

  tab: Tab = {
    selectedTab: 0
  };

  constructor() { }

  setSelectedTab(tab: number) {
    this.tab.selectedTab = tab;
  }

}
