import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getUsers(username: string): Observable<any> {
    return this.http.get<any>("https://api.github.com/search/users?q=" + username + "+in:login&per_page=16");
  }
}
