import {TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {AppModule} from '../app.module';


describe('UsersComponent', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule]
  }));

  it('should have a title', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement;
    expect(element.querySelector('h1').textContent).toContain('Save');
  });
});
