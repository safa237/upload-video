import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetVideosComponent } from './get-videos.component';

const routes: Routes = [
  { path: '', component: GetVideosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetVideosRoutingModule { }
