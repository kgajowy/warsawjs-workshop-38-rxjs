import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {ConfigData} from './data';

const configKey = 'config';
const defaultConfig = {
  page: 0
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {
  }

  fetchConfig(): Observable<ConfigData> {
    console.log('fetching config');
    const randomDelay = Math.floor(Math.random() * 1000 + 500);
    return of(this.getConfig()).pipe(delay(randomDelay));
  }

  private getConfig(): ConfigData {
    return JSON.parse(localStorage.getItem(configKey)) || defaultConfig;
  }

  private setConfig(config: ConfigData) {
    localStorage.setItem(configKey, JSON.stringify(config));
  }
}
