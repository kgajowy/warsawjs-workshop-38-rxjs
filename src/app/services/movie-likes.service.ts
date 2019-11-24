import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {delay, tap} from 'rxjs/operators';
import {ConsoleService} from '../pages/movie-likes/console.service';
import {Movie} from '../pages/movie-likes/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieLikesService {
  private dispatcher = new Subject<Movie>();
  private state = new BehaviorSubject<Movie[]>([
    {id: 'movie1', name: 'Paterson', img: '/assets/images/paterson.jpg', liked: false},
    {id: 'movie2', name: 'Rogue One', img: '/assets/images/rogueone.jpg', liked: false},
  ]);

  private actions$ = this.dispatcher.asObservable().pipe(
    tap((movie) => this.setMovie(movie)),
  );

  constructor(private consoleService: ConsoleService) {
    this.actions$.subscribe();
  }

  getState$(): Observable<Movie[]> {
    return this.state.asObservable();
  }

  private setMovie(movie: Movie) {
    const movies = [...this.state.getValue()];
    const idx = movies.findIndex(m => m.id === movie.id);
    movies[idx] = movie;
    this.state.next(movies);
  }

  private saveMovie(movie: Movie): Observable<Movie> {
    const randomDelay = Math.floor(Math.random() * 1000 + 500);
    // this.consoleService.log(`saving id: ${movie.id}...`);
    return of({...movie})
      .pipe(
        delay(randomDelay),
        tap(() => void this.consoleService.log(`saved id: ${movie.id}`))
      );
  }

  updateMovie(movie: Movie) {
    this.dispatcher.next(movie);
  }
}
