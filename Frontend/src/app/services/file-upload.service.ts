import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // private baseUrl = 'http://localhost:4200';

  private baseUrl = ' https://t3d-model-viewer-backend.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  getFiles(): Observable<any>{
    return this.http.get(`${this.baseUrl}/files`);
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/uploadModel`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
