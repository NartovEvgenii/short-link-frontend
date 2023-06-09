import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/features/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
    private readonly route: Router,
    private readonly authService: AuthService,
    private readonly snackbar: MatSnackBar,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  async onLoginButtonClick(): Promise<void> {
    console.log(this.form);
    const email = this.form.value.email;
    const password = this.form.value.password;

    try {
      await this.authService.login({email, password});
      await this.route.navigate(['/']);
    } catch (err) {
      this.snackbar.open('Ошибка входа в аккаунт', 'ок', {
        duration: 3000
      });
    }
  }
}
