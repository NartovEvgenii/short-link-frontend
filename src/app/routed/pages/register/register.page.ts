import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/features/services/auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss']
  })
  export class RegisterPage implements OnInit {
  
    form: FormGroup;
  
    constructor(
      private readonly route: Router,
      private readonly authService: AuthService,
      private readonly snackbar: MatSnackBar,
    ) {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordAgain: new FormControl('', Validators.required),
      });
    }
  
    ngOnInit(): void {
    }
  
    async onRegisterButtonClick(): Promise<void> {
      const name = this.form.value.name;
      const surname = this.form.value.surname;
      const email = this.form.value.email;
      const password = this.form.value.password;
  
      try {
        await this.authService.register({email, name, surname, password});
        await this.route.navigate(['/']);
      } catch (err) {
        this.snackbar.open('Ошибка создания аккаунта', 'ок', {
            duration: 3000
          });
      }
    }
  }