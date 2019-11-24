import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MovieLikesComponent} from './movie-likes.component';
import {MoviePickerComponent} from './movie-picker.component';


@NgModule({
  declarations: [MovieLikesComponent, MoviePickerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MovieLikesComponent
      }
    ])
  ]
})
export class MovieLikesModule {
}
