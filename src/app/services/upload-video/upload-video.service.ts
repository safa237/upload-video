import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoUploadRequest } from 'src/app/interfaces/video';

@Injectable({
  providedIn: 'root'
})
export class UploadVideoService {
  private API_BASE_URL = 'https://appnest.pro/mozakarabackend/Api/V1';
  private AUTH_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjgwZmMzNjI0LTBkZDMtNGI4YS04MDI0LTQ4YzU4YTU1YTIyZCIsInN1YiI6ImJla2VtZTk1OTgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJiZWtlbWU5NTk4QHNrYXRlcnUuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InllbWVuIHRlc3QgdGVjaCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjEwLzI2LzIwMjUgOTo1MDoxOCBQTSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRlYWNoZXIiLCJqdGkiOiIyZWNiOTJjYy03NzNkLTQ5ZjktODI5MS00OWJlM2QxMTEwNzkiLCJhdWQiOlsiaHR0cDovL2xvY2FsaG9zdDo0NDMzNy8iLCJodHRwOi8vbG9jYWxob3N0OjQ0MzM3LyJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzM3LyIsImV4cCI6MTc2MTUxNTQxOH0.ju-d8g6tJTLW9suHNH7s1mWLcNvCf5DTaYblzGVjwQk';

  constructor(private http: HttpClient) {}

  initializeUpload(request: VideoUploadRequest): Observable<string> {
    return new Observable<string>((observer) => {
      this.http.post<{ data: string }>(
        `${this.API_BASE_URL}/videos/initialize`,
        request,
        { headers: new HttpHeaders({ Authorization: this.AUTH_TOKEN }) }
      ).subscribe({
        next: (res) => {
          observer.next(res.data);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  uploadChunk(videoId: string, chunkIndex: number, chunk: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', chunk);

    return new Observable<void>((observer) => {
      this.http.post(
        `${this.API_BASE_URL}/videos/${videoId}/chunk/${chunkIndex}`,
        formData,
        { headers: new HttpHeaders({ Authorization: this.AUTH_TOKEN }) }
      ).subscribe({
        next: () => {
          observer.next();
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  completeUpload(videoId: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.http.post(
        `${this.API_BASE_URL}/videos/${videoId}/complete`,
        {},
        { headers: new HttpHeaders({ Authorization: this.AUTH_TOKEN }) }
      ).subscribe({
        next: () => {
          observer.next();
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }
}