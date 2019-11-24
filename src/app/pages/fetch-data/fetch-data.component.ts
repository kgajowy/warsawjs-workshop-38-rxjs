import {Component, OnInit} from '@angular/core';
import {FetchDataService} from '../../services/fetch-data.service';

@Component({
  selector: 'app-fetch-data',
  template: `
    <div>
      <button (click)="showConfig = !showConfig">Show config</button>
      <p *ngIf="showConfig">
        {{config$ | async | json}}
      </p>
    </div>
    <div>
      <button (click)="showPictures = !showPictures">Show pictures</button>
      <div *ngIf="showPictures">
        <img *ngFor="let picture of pictures$ | async" [src]="picture" width="300" height="300">
      </div>
    </div>
  `,
  styleUrls: ['./fetch-data.component.scss']
})
export class FetchDataComponent implements OnInit {
  showConfig = false;
  showPictures = false;

  config$ = this.fetchData.getConfig$();
  pictures$ = this.fetchData.getPictures$();


  constructor(private fetchData: FetchDataService) {
  }

  ngOnInit() {
  }

}
