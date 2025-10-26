import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadVideoRoutingModule } from './upload-video-routing.module';
import { UploadVideoComponent } from './upload-video.component';
import { ProgressComponent } from './progress/progress.component';


@NgModule({
  declarations: [
    UploadVideoComponent,
    ProgressComponent
  ],
  imports: [
    CommonModule,
    UploadVideoRoutingModule
  ]
})
export class UploadVideoModule { }
