import { Component } from '@angular/core';
import { Input , Output , EventEmitter } from '@angular/core';
import { UploadProgress } from 'src/app/interfaces/video';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

   @Input() progress: number = 0;
  @Input() uploadState!: UploadProgress;
  @Input() uploading: boolean = false;
  @Input() isPaused: boolean = false;

  @Output() abort = new EventEmitter<void>();

  isExpanded: boolean = true;
}