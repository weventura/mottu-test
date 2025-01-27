import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  URL_API: string = 'https://rickandmortyapi.com/api';

  private readonly http = inject(HttpClient);

  onGet<T>(url: string): Observable<T>{
    return this.http.get<T>(`${this.URL_API}/${url}`);
  }
}
