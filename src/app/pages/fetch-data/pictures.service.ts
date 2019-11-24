import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PictureData} from './data';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private http: HttpClient) {
  }

  fetchPictures(pageNr: number): Observable<PictureData[]> {
    console.log('fetching pictures page', pageNr);
    return this.http.get<PictureData[]>('https://picsum.photos/v2/list?page=1&limit=100', {
      params: {
        page: pageNr.toString(),
        limit: '10',
      }
    });
  }
}
