import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private state = new BehaviorSubject<string[]>([]);

  constructor() {
  }

  getState$(): Observable<string[]> {
    interface Tmp {
      text: string;
      count: number;
    }

    return this.state.asObservable()
      .pipe(
        map(s => s.map(text => ({text, count: 1}))),
        map((s: Tmp[]) => s.reduce(
          (acc: Tmp[], curr: Tmp) => {
            if (acc.length === 0) {
              return [curr];
            }
            const lastValue = acc[acc.length - 1];
            const nextVal = curr.text === lastValue.text
              ? {...lastValue, count: curr.count + lastValue.count}
              : curr;
            const next = curr.text === lastValue.text
              ? acc.slice(0, -1)
              : acc;
            return [...next, nextVal];
          },
          []
        )),
        map((s: Tmp[]) => s.map(t => `${t.text} (${t.count})`))
      );
  }

  log(text: string) {
    const curr = this.state.getValue();
    this.state.next([...curr, text]);
  }

  clear() {
    this.state.next([]);
  }
}
