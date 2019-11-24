import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ConsoleService} from './console.service';
import {Movie} from './movie';
import {MovieLikesService} from '../../services/movie-likes.service';

@Component({
  selector: 'app-movie-likes',
  template: `
    <div class="container">
      <h1>MoviePickr</h1>
      <div class="row">
        <app-movie-picker
                *ngFor="let movie of movies$ | async"
                [movie]=movie
                (movieChanged)="movieChanged($event)"
                class="column"
        ></app-movie-picker>
      </div>
      <div class="row">
        <div class="column">
          <div class="console">
            <div class="console-header">
              <p>Output</p>
              <div class="button-wrapper">
                <button (click)="clear()" class="clear-output">🗑️</button>
              </div>
            </div>
            <ul id="output">
              <li *ngFor="let log of log$ | async">
                {{log}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./movie-likes.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieLikesComponent implements OnInit {
  movies$ = this.movieLikesService.getState$();
  log$ = this.consoleService.getState$();

  constructor(private movieLikesService: MovieLikesService, private consoleService: ConsoleService) {
  }

  ngOnInit() {
  }

  movieChanged(movie: Movie) {
    this.movieLikesService.updateMovie(movie);
  }

  clear() {
    this.consoleService.clear();
  }
}
