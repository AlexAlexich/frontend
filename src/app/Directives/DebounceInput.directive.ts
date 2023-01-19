import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, takeUntil } from 'rxjs';
import { CommonComponent } from '../Models/CommonComponent/CommonComponent.component';

@Directive({
  selector: '[input[debounceInput]]',
})
export class DebounceInputDirective extends CommonComponent {
  @Input() time: number = 0;
  @Output()
  readonly debounceInput: EventEmitter<string> = new EventEmitter<string>();
  constructor(private el: ElementRef<HTMLInputElement>) {
    super();
  }

  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'input')
      .pipe(
        takeUntil(this.localNgUnsubscribe),
        distinctUntilChanged(),
        debounceTime(this.time)
      )
      .subscribe((val) => {
        this.debounceInput.emit(this.el.nativeElement.value);
      });
  }
}
