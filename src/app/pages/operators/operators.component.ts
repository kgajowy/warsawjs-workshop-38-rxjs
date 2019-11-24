import {Component, OnInit} from '@angular/core';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  template: `
    <mat-card>
      <mat-card-content>
        <div class="columns header">
          <div class="column">Source observable</div>
          <div class="column">Result observable</div>
        </div>
      </mat-card-content>
    </mat-card>
    <app-operator-component
            *ngFor="let operator of operators"
            [operator]="operator"
    ></app-operator-component>
  `,
  styleUrls: ['./operators.component.scss']
})
export class OperatorsComponent implements OnInit {
  operators = [
    map(x => +x * +x),
    filter(x => +x % 3 === 1)
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
