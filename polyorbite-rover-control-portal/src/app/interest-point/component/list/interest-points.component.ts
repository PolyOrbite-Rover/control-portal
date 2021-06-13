import { Component, ElementRef, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { EditableTextComponent } from 'src/app/editable-text/editable-text.component';
import { InterestPointService } from '../../service/interest-point.service';

@Component({
  selector: 'app-interest-points',
  templateUrl: './interest-points.component.html',
  styleUrls: ['./interest-points.component.sass']
})
export class InterestPointsComponent {
  selectedId: string;

  @ViewChildren('interestPointNameEditors') interestPointNameEditors: QueryList<EditableTextComponent>;

  select(uuid: string): void {
    if(uuid !== this.selectedId) {
      this.stopEditing();
      this.selectedId = uuid;
    }
  }

  stopEditing(): void {
    this.interestPointNameEditors.forEach(
      editor => editor.isEditing = false
    );
  }

  constructor(public interestPoints: InterestPointService) {
    if(this.interestPoints.entries.length > 0) {
      this.selectedId = this.interestPoints.entries[0].uuid;
    }
  }
}
