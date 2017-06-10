import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'amzr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  form: FormGroup;
  success: boolean;
  username: string;

  error: any;

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

  login(form) {
    const credentials = {username: form.value.username, password: form.value.password};

    this.auth.login(credentials).subscribe((result => {
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

