import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { ShortLinkRequest } from "../models/short-link-request.model";
import { ShortLink } from "../models/short-link.model";


@Injectable({
    providedIn: 'root'
  })
  export class ShortLinkService {
    
    constructor(
      private readonly http: HttpClient
    ) {
    }
  
    async createShortLink(shortLinkRequest: ShortLinkRequest): Promise<void> {
      this.http.post<any>(`${environment.apiUrl}/shortLinks/generate`, shortLinkRequest)
      .subscribe(shortLink => {
            if (shortLink !== null) {

            } else {

            }
        });      
    }

    getAllShortLink() {
      return this.http.get<ShortLink[]>(`${environment.apiUrl}/shortLinks/all`);
    }
  
  }