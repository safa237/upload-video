import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UploadVideoService } from 'src/app/services/upload-video/upload-video.service';
import { UploadProgress } from 'src/app/interfaces/video';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent {
  progress: UploadProgress | null = null;
  selectedFile: File | null = null;
  isUploading: boolean = false;

  constructor(private router: Router, private uploadVideo: UploadVideoService) {}

  goToGetVideos() {
    this.router.navigate(['/get-videos']);
  }

  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  if (this.selectedFile) {
    console.log('File selected:', this.selectedFile.name);

    this.isUploading = true;
    this.progress = {
      videoId: '',
      fileName: this.selectedFile.name,
      fileSize: this.selectedFile.size, 
      progress: 0,
      status: 0
    };

    this.upload(); 
  }
}


  upload() {
    if (!this.selectedFile) return;
    const file = this.selectedFile;
    const CHUNK_SIZE = 1024 * 1024;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    console.log('Starting upload:', file.name);

    this.uploadVideo.initializeUpload({
      fileName: file.name,
      contentType: file.type,
      fileSize: file.size,
      totalChunks
    }).subscribe({
      next: (videoId: string) => {
        this.progress!.videoId = videoId;
        this.uploadChunks(videoId, file, CHUNK_SIZE, totalChunks);
      },
      error: (err) => {
        console.error('Error initializing upload:', err);
        this.isUploading = false;
      }
    });
  }

  uploadChunks(videoId: string, file: File, CHUNK_SIZE: number, totalChunks: number) {
    let currentChunk = 0;

    const uploadNextChunk = () => {
      if (currentChunk >= totalChunks) {
        this.uploadVideo.completeUpload(videoId).subscribe({
          next: () => {
            this.progress = {
              videoId,
              fileName: file.name,
              progress: 100,
              status: 2
            };
            console.log('Upload completed:', file.name);
            setTimeout(() => {
              this.isUploading = false;
              this.progress = null;
              this.selectedFile = null;
              const input = document.querySelector('input[type="file"]') as HTMLInputElement;
              if (input) input.value = '';
            }, 1500);
          },
          error: (err) => {
            console.error('Error completing upload:', err);
            this.isUploading = false;
          }
        });
        return;
      }

      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      this.uploadVideo.uploadChunk(videoId, currentChunk, new File([chunk], `chunk_${currentChunk}`, { type: file.type }))
        .subscribe({
          next: () => {
            currentChunk++;
            const progressPercent = Math.round((currentChunk / totalChunks) * 100);
            this.progress = {
              videoId,
              fileName: file.name,
              progress: progressPercent,
              status: 0
            };
            uploadNextChunk();
          },
          error: (err) => {
            console.error(`Error uploading chunk ${currentChunk}:`, err);
            this.isUploading = false;
          }
        });
    };
    uploadNextChunk();
  }

  onCancelUpload() {
    console.log('Upload canceled by user');
    this.isUploading = false;
    this.progress = null;
    this.selectedFile = null;
  }
}