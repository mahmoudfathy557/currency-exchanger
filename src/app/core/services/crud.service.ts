import { Observable, shareReplay } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudService<T, ID> {
  protected _http: HttpClient = inject(HttpClient);

  protected APIUrl = environment.APIUrl + this.getResourceUrl();
  abstract getResourceUrl(getResourceUrl?: string): string;
}
