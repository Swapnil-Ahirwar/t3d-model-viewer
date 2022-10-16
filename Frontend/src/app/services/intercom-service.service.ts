import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercomServiceService {

  constructor() {}

  private modelNotificationHolder = new Subject<any>();

  notifyObservable$ = this.modelNotificationHolder.asObservable();

  public notifyModelUploaded(downloadedUrl: String) {
    if (downloadedUrl) this.modelNotificationHolder.next(downloadedUrl);
  }
}
