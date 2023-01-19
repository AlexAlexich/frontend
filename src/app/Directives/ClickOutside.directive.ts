import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Input() appClickOutside;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    document.addEventListener('click', this.clickOutside.bind(this), true);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.clickOutside.bind(this), true);
  }

  clickOutside(event) {
    if (
      event.target.closest('mat-select') ||
      event.target.matches('mat-select')
    ) {
      return;
    }
    if (
      !this.el.nativeElement.contains(event.target) &&
      this.appClickOutside.opened
    ) {
      this.appClickOutside.toggle();
      this.clickOutsideEvent.emit(false);
    }
  }
  @Output() clickOutsideEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
}
