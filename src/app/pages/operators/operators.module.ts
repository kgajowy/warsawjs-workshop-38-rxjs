import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {OperatorComponentComponent} from './operator-component/operator-component.component';
import {OperatorsComponent} from './operators.component';


@NgModule({
  declarations: [OperatorsComponent, OperatorComponentComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OperatorsComponent
      }
    ])
  ]
})
export class OperatorsModule {
}
