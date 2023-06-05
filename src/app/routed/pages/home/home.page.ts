import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  ) {
    
    this.form = new FormGroup({
      fullUrl: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.shortLinkObs = this.shortLinkService.getAllShortLink();
    this.authService.authorized$.subscribe(async value => {
      if (value) {
        this.idUser = this.authService.user?.idUser??undefined;
      } else {
          this.idUser = undefined;
      }
    });
  }

  async createShortLinkButtonClick(): Promise<void> { 
    const fullUrl = this.form.value.fullUrl;
    const idLinkUser = this.idUser!;
    this.shortLinkService.createShortLink({fullUrl, idLinkUser});
    this.form.reset();
  }
}
