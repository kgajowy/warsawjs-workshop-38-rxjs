import {Component, Input} from '@angular/core';
import {BehaviorSubject, identity, Observable, OperatorFunction, Subject} from 'rxjs';
import {map, scan, switchMap} from 'rxjs/operators';

const groupAndJoin = (source: Observable<any>) => source.pipe(
  scan((acc, v) => [...acc, v], []),
  map(arr => arr.join(', '))
);

@Component({
  selector: 'app-operator-component',
  template: `
    <mat-card>
      <mat-card-content>
        <div class="columns">
          <div class="column">{{sourceScanned$ | async}}</div>
          <div class="column">{{resultScanned$ | async}}</div>
        </div>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button mat-raised-button color="primary" (click)="clicks.next($event)">Click</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./operator-component.component.scss']
})
export class OperatorComponentComponent {
  private operatorSubject: BehaviorSubject<OperatorFunction<any, any>> = new BehaviorSubject(identity);

  clicks = new Subject();

  source$ = this.clicks.asObservable().pipe(scan((acc) => acc + 1, 0));
  result$ = this.operatorSubject.asObservable().pipe(
    switchMap(operator => this.source$.pipe(operator))
  );
  sourceScanned$ = this.source$.pipe(groupAndJoin);
  resultScanned$ = this.result$.pipe(groupAndJoin);

  @Input() set operator(operator: OperatorFunction<any, any>) {
    this.operatorSubject.next(operator);
  }
}
