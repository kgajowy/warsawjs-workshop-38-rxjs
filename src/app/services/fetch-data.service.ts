import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ConfigService} from '../pages/fetch-data/config.service';
import {ConfigData} from '../pages/fetch-data/data';
import {PicturesService} from '../pages/fetch-data/pictures.service';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  constructor(private configService: ConfigService, private pictureService: PicturesService) {
  }

  getConfig$(): Observable<ConfigData> {
    return this.configService.fetchConfig();
  }

  getPictures$(): Observable<string[]> {
    return this.getConfig$().pipe(
      switchMap(({page}) => this.pictureService.fetchPictures(page)),
      map(pictures => pictures.map(({id}) => `https://picsum.photos/id/${id}/300/300`))
    );
  }
}
