import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent {

  constructor(private router : Router){}
  
  goToGetVideos() {
    this.router.navigate(['/get-videos']);
  }
}
