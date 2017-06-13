import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'amzr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // manage Forms
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {
    this.form = this.fb.group({
      // Validator that requires controls to have a non-empty value.
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  ngOnInit() {
  }

  // Display the error
  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].touched && this.form.controls[field].errors && this.form.controls[field].errors[error];
  }

  // Save your login
  register(form): void {
    const login = {username: form.value.username, password: form.value.password};
    this.auth.saveRegister(login)
      .subscribe(
        result => {
          if (result && result.success) {
            this.router.navigate(['/login']);
          }
        }
      );
  }
}
