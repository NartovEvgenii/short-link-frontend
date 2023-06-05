import { Component, OnInit } from "@angular/core";
import { User } from "src/app/features/models/user.model";
import { AuthService } from "src/app/features/services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
  })
  export class HeaderComponent implements OnInit {
  
    user: User | undefined;
      
    constructor(
      private readonly authService: AuthService,
    ) {
  
    }
  
    ngOnInit(): void {
      this.authService.authorized$.subscribe(async value => {
        if (value) {
          this.user = this.authService.user??undefined;
        } else {
            this.user = undefined;
        }
      });
    }
  
    logout(): void {
      this.authService.logout();
    }
  }