import { browser, by, element } from 'protractor';

export class AmzRClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('amzr-root h1')).getText();
  }
}
