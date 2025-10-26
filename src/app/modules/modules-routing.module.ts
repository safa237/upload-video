import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'upload-video',
    pathMatch: 'full'
  },
  {
    path: 'upload-video',
    loadChildren: () => import('./upload-video/upload-video.module').then(m => m.UploadVideoModule)
  },
  {
    path: 'get-videos',
    loadChildren: () => import('./get-videos/get-videos.module').then(m => m.GetVideosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {}
