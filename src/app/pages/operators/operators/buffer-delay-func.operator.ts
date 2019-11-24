import {BehaviorSubject, MonoTypeOperatorFunction, Observable, zip} from 'rxjs'
import {filter, finalize, map, tap} from 'rxjs/operators'

export const bufferDelayFunc = <T>(time: number): MonoTypeOperatorFunction<T> => (source: Observable<T>): Observable<T> => {
  return new Observable<T>(observer => {
    const gate = new BehaviorSubject<void>(null);
    const gateOpen$ = gate.asObservable();
    let currTimeout;

    return zip(source, gateOpen$)
        .pipe(
            tap(() => {
              currTimeout = setTimeout(() => gate.next(), time);
            }),
            map(([s]) => s),
            finalize(() => {
              if (currTimeout) {
                clearTimeout(currTimeout);
              }
            })
        ).subscribe({
          next(x) {
            observer.next(x);
          },
          error(err) {
            observer.error(err);
          },
          complete() {
            observer.complete();
          }
        });
  });
};
