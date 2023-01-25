import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogFormat } from 'src/app/Models/DialogFormat';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFormat
  ) {}

  ngOnInit(): void {}
  onYes() {
    this.clicked.emit(true);
    this.dialogRef.close();
  }
  onNo() {
    this.clicked.emit(false);
    this.dialogRef.close();
  }
}
