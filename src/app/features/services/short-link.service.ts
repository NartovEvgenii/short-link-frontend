import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { ShortLinkRequest } from "../models/short-link-request.model";
import { ShortLink } from "../models/short-link.model";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
  export class ShortLinkService {
    
    constructor(
      private readonly http: HttpClient
    ) {
    }
  
    createShortLink(shortLinkRequest: ShortLinkRequest): Observable<ShortLink> {
      return this.http.post<ShortLink>(`${environment.apiUrl}/shortLinks/generate`, shortLinkRequest);      
    }

    deleteShortLink(idShortLink: number): Observable<null> {
      return this.http.delete<null>(`${environment.apiUrl}/shortLinks`, 
                                        {params : {
                                          'idShortLink' : idShortLink
                                        }});      
    }

    getShortLinkByUser(idUser: number) {
      return this.http.get<ShortLink[]>(`${environment.apiUrl}/shortLinks`, 
                                          {params : {
                                            'idUser' : idUser
                                          }}
       );
    }
  
  }