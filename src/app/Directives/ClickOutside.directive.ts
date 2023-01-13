import { Directive, ElementRef, Input } from '@angular/core';

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
      !this.el.nativeElement.contains(event.target) &&
      this.appClickOutside.opened
    ) {
      this.appClickOutside.toggle();
    }
  }
}
