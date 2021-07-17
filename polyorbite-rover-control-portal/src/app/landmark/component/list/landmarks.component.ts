import { Component, ElementRef, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EditableTextComponent } from 'src/app/editable-text/editable-text.component';
import { LandmarkService } from '../../service/landmark.service';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.sass']
})
export class LandmarksComponent {
  selectedId: string;

  @ViewChildren('landmarkNameEditors') landmarkNameEditors: QueryList<EditableTextComponent>;

  select(uuid: string): void {
    if(uuid !== this.selectedId) {
      this.stopEditing();
      this.selectedId = uuid;
    }
  }

  stopEditing(): void {
    this.landmarkNameEditors.forEach(
      editor => editor.isEditing = false
    );
  }

  constructor(public landmarks: LandmarkService) {
    if(this.landmarks.entries.length > 0) {
      this.selectedId = this.landmarks.entries[0].uuid;
    }
  }
}
