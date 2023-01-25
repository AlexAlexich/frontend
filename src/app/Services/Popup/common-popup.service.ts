import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogFormat } from 'src/app/Models/DialogFormat';
import { DialogComponent } from 'src/app/Widgets/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CommonPopupService {
  constructor(private dialog: MatDialog) {}

  openPopup(
    title: string = 'Confirm',
    text: string = 'Are you sure you want to proceed?'
  ): Observable<boolean> {
    let popupModel = new DialogFormat();
    popupModel.title = title;
    popupModel.text = text;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: popupModel,
    });

    return dialogRef.componentInstance.clicked.asObservable();
  }
}
