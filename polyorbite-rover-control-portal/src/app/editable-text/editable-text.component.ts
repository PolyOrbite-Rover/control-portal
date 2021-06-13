import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.sass']
})
export class EditableTextComponent {
  @Input('text') text: string;
  @Output('textChange') textChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('editor') editor: ElementRef<HTMLInputElement>;

  isEditing: boolean = false;

  updateText(): void {
    const newText = this.editor.nativeElement.value;

    this.text = newText;
    this.textChange.emit(newText);

    this.isEditing = false;
  }
}
