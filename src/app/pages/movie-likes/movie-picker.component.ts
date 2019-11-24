import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from './movie';

@Component({
  selector: 'app-movie-picker',
  template: `
    <div class="center">
      <img [src]="movie.img" width="250" alt="{{movie.name}} movie poster"/>
      <button id="movie1" class="shadow-button" (click)="toggleLike()">
        {{movie.liked ? '😎' : '😩'}}
      </button>
    </div>
  `,
  styleUrls: ['./movie-picker.component.scss']
})
export class MoviePickerComponent implements OnInit {
  @Input() movie: Movie;
  @Output() movieChanged: EventEmitter<Movie> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  toggleLike() {
    this.movieChanged.emit({...this.movie, liked: !this.movie.liked});
  }
}
