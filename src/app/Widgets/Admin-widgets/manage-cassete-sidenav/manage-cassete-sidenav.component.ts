import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonComponent } from 'src/app/Models/CommonComponent/CommonComponent.component';

@Component({
  selector: 'app-manage-cassete-sidenav',
  templateUrl: './manage-cassete-sidenav.component.html',
  styleUrls: ['./manage-cassete-sidenav.component.scss'],
})
export class ManageCasseteSidenavComponent
  extends CommonComponent
  implements OnInit
{
  options = this._formBuilder.group({
    bottom: 0,
    fixed: true,
    top: 0,
    right: 0,
  });
  @Input() opened: boolean;

  @Input() preventClose: boolean;

  @Output() clickedOutside: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private _formBuilder: FormBuilder) {
    super();
  }
  ngOnInit(): void {}
  forwardNext(event: boolean) {
    this.clickedOutside.emit(event);
  }
}
