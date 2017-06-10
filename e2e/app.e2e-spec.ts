import { AmzRClientPage } from './app.po';

describe('amz-r-client App', () => {
  let page: AmzRClientPage;

  beforeEach(() => {
    page = new AmzRClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('amzr works!');
  });
});
