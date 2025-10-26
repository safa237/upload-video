export interface VideoUploadRequest {
    fileName: string;
    contentType: string;
    fileSize: number;
    totalChunks: number;
  }
  
  export interface UploadProgress {
    videoId: string;
    fileName: string;
    progress: number;
    status: number;
    error?: string;
    fileSize?:number;
  }