import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: Map<string, any> = new Map();

  constructor() {}

  get(key: string, ObservableApi: Observable<any>): Observable<any> {
    let response: CacheModel = this.cache.get(key);

    if (response && response.hasResponse) {
      return of(response.cache);
    }
    if (!response) {
      this.setCache(key, ObservableApi);
    }

    return ObservableApi.pipe(
      map((res) => {
        return JSON.parse(JSON.stringify(res));
      })
    );
  }

  has(key: string) {
    return this.cache.has(key);
  }

  delete(key: string) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  private setCache(key: string, observableCall: Observable<any>): void {
    this.cache.set(key, new CacheModel(observableCall));
  }

  executeAndDelete(
    key: string,
    observableCall: Observable<any>
  ): Observable<boolean> {
    return observableCall.pipe(
      map(() => {
        this.cache.delete(key);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}

export class CacheModel {
  hasResponse: boolean = false;
  cache: any;
  observableApi: Observable<any>;
  constructor(obsApi: Observable<any>) {
    this.observableApi = obsApi.pipe(share());
    this.observableApi.subscribe((x) => {
      this.cache = x;
      this.hasResponse = true;
    });
  }
}
