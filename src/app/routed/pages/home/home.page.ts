import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { ShortLink } from "src/app/features/models/short-link.model";
import { AuthService } from "src/app/features/services/auth.service";
import { ShortLinkService } from "src/app/features/services/short-link.service";
import { environment } from "src/environment/environment";


@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  form: FormGroup;
  idUser: number | undefined;
  apiUrl = environment.apiUrl;

  shortLinkObs: Observable<ShortLink[]>|undefined;


  constructor(
    private readonly authService: AuthService,
    private readonly shortLinkService: ShortLinkService,
    private readonly snackbar: MatSnackBar,    
  ) {
    
    this.form = new FormGroup({
      fullUrl: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {    
    this.authService.authorized$.subscribe(async value => {
      if (value) {
        this.idUser = this.authService.user?.idUser??undefined;
        this.shortLinkObs = this.shortLinkService.getShortLinkByUser(this.idUser!);
      } else {
          this.idUser = undefined;
          this.shortLinkObs = undefined;
      }
    });
  }

  async createShortLinkButtonClick(): Promise<void> { 
    const fullUrl = this.form.value.fullUrl;
    const idLinkUser = this.idUser!;
    this.shortLinkService.createShortLink({fullUrl, idLinkUser}).subscribe(shortLink => {
                if (shortLink !== null) {
                  this.shortLinkObs = this.shortLinkService.getShortLinkByUser(this.idUser!);
                } else {
                  this.snackbar.open('Произошла ошибка при создании ссылки', 'ок', {
                    duration: 3000
                  })
                }
            });
    this.form.reset();
  }

  async deleteShortLinkButtonClick(idShortLink: number): Promise<void> { 
    const fullUrl = this.form.value.fullUrl;
    const idLinkUser = this.idUser!;
    this.shortLinkService.deleteShortLink(idShortLink).
                subscribe(() => {this.snackbar.open('Ссылка удалена', 'ок', {
                  duration: 3000
                });
                this.shortLinkObs = this.shortLinkService.getShortLinkByUser(this.idUser!);
              }
            );
    this.form.reset();
  }
}
