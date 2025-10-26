import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadVideoRoutingModule } from './upload-video-routing.module';
import { UploadVideoComponent } from './upload-video.component';


@NgModule({
  declarations: [
    UploadVideoComponent
  ],
  imports: [
    CommonModule,
    UploadVideoRoutingModule
  ]
})
export class UploadVideoModule { }
