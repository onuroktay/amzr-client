import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement}    from '@angular/core';

import {LoginComponent} from './login.component';




describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  describe('Component: Profile', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(LoginComponent);
          component = fixture.debugElement.componentInstance;
          element = fixture.debugElement.nativeElement;
        });
    }));
  });

  it('should render correct profile name from the model', () => {
    component.form.value.username = 'onur';

    fixture.detectChanges();

    expect(element.querySelector('h2.profile-name').textContent).toBe('onur');
  });

});
