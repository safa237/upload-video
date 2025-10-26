import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetVideosRoutingModule } from './get-videos-routing.module';
import { GetVideosComponent } from './get-videos.component';


@NgModule({
  declarations: [
    GetVideosComponent
  ],
  imports: [
    CommonModule,
    GetVideosRoutingModule
  ]
})
export class GetVideosModule { }
