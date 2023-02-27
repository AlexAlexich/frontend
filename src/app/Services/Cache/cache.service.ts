import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: Map<string, any> = new Map();
  constructor() {}

  get(key: string, observableApi: Observable<any>): Observable<any> {
    let response: CacheModel = this.cache.get(key);

    if (response) {
      if (response.cache) {
        return of(JSON.parse(JSON.stringify(response.cache)));
      }
      return response.observableApi.pipe(
        map((res) => {
          return JSON.parse(JSON.stringify(res));
        })
      );
    }

    observableApi = observableApi.pipe(share());
    this.setCache(key, observableApi);
    return observableApi;
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
    this.observableApi = obsApi;
    this.observableApi.subscribe((x) => {
      this.cache = x;
      this.hasResponse = true;
    });
  }
}
