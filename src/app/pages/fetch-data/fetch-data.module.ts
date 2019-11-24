import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FetchDataComponent} from './fetch-data.component';


@NgModule({
  declarations: [FetchDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FetchDataComponent
      }
    ])
  ]
})
export class FetchDataModule {
}
