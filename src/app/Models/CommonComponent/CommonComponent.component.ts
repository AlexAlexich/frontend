import { Directive } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
@Directive({})
export class CommonComponent {
  localNgUnsubscribe: Subject<void> = new Subject<void>();

  canDeactivate(): Observable<boolean> {
    return of(true);
  }
  ngOnDestroy(): void {
    this.localNgUnsubscribe.next();
    this.localNgUnsubscribe.complete();
  }
}
