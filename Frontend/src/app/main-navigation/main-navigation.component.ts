import { Component , OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from '../services/file-upload.service';
import { IntercomServiceService } from '../services/intercom-service.service';

// import GLTFLoader from 'three-gltf-loader';
// import * as THREE from 'three';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit{

  private baseUrl = 'http://localhost:4200';
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  ngOnInit() {
    this.fileInfos = this.uploadService.getFiles();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private uploadService: FileUploadService,
    private intercomService: IntercomServiceService
    ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    selectFile(event: any): void {
      this.selectedFiles = event.target.files;
      this.upload()
    }
  
    upload(): void {
      this.progress = 0
  
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
  
        if (file) {
          this.currentFile = file;
  
          this.uploadService.upload(this.currentFile).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = "File uploaded " + event.body.fileName;
                this.fileInfos = this.uploadService.getFiles();
                const downloadedUrl = event.body.downloadUrl;
                this.notifyModelSelected(downloadedUrl);
                this.progress = 0
              }
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;
  
              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the file!';
              }
              window.alert(this.message)
              this.currentFile = undefined;
            }
          });
        }
  
        this.selectedFiles = undefined;
      }
    }

    notifyModelSelected(downloadUrl: String) {
      this.intercomService.notifyModelUploaded(downloadUrl);
    }
}

