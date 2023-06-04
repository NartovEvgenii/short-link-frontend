import { BehaviorSubject, firstValueFrom} from "rxjs";
import { LoginRequest } from "../models/login-request.model";
import { environment } from "src/environment/environment";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UserRequest } from "../models/user-request.model";
import { UserResponse } from "../models/user-response.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    user: User | null ;
    token: string;
  
    authorized$: BehaviorSubject<boolean>;
  
    constructor(
      private readonly http: HttpClient
    ) {
      this.token = localStorage.getItem('token')??"";
      const userJson = localStorage.getItem('user');
      if(userJson != null){        
        this.user = JSON.parse(userJson);
      } else {
        this.user = null;
      }
      this.authorized$ = new BehaviorSubject<boolean>(this.user !== null);
    }
  
    async login(loginRequest: LoginRequest): Promise<void> {
      const userResponse = await firstValueFrom(this.http.post<any>(`${environment.apiUrl}/user/login`, loginRequest));
      this.mapUserResponse(userResponse);
      this.authorized$.next(true);
    }
  
    async register(userRequest: UserRequest): Promise<void> {
      const userResponse = await firstValueFrom(this.http.post<UserResponse>(`${environment.apiUrl}/user/register`, userRequest));
      this.mapUserResponse(userResponse);
      this.authorized$.next(true);
    }
  
    async logout(): Promise<void> {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.authorized$.next(false);
    }

    mapUserResponse(userResponse: UserResponse){
        this.setUser(userResponse.idUser, userResponse.email, userResponse.name, userResponse.surname);
        this.setToken(userResponse.token);
    }
  
  
    setUser(idUser : number, email : string, name : string, surname : string): void {
        this.user = new User(idUser,
                      email??"",
                      name??"",
                      surname??"");
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  
    setToken(token: string): void {
      this.token = token;
      localStorage.setItem('token', token);
    }
  }