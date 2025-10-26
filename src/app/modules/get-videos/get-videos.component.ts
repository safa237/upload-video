import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-videos',
  templateUrl: './get-videos.component.html',
  styleUrls: ['./get-videos.component.scss']
})
export class GetVideosComponent {

  constructor(private router : Router){}

   goToUploadVideo() {
    this.router.navigate(['/upload-video']);
  }
}
