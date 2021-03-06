import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'amzr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  success: boolean;
  username: string;

  error: any;

  subscription: Subscription;


  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].touched && this.form.controls[field].errors && this.form.controls[field].errors[error];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login(form) {
    const credentials = {username: form.value.username, password: form.value.password};

    this.subscription = this.auth.login(credentials).subscribe((result => {
        this.success = result.success;
        this.username = result.data.username;
        if (this.success === true) {
          this.router.navigate(['/app/items/page/1']);

        }
      }),
      (err: Response) => this.error = err.text()
    );
  }

}

