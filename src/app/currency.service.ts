import { Injectable } from '@angular/core';

import { data } from './rates';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  result;
  Observer;

  constructor() {
    this.result = data.rates;
    this.Observer = {
      result : this.result,
      subscribe: this.subscribe,
      filter : this.filter
    };
  }

  subscribe(next, complete) {
    let i = 0;
    const keys = Object.keys(this.result);
    const size = this.result.length;

    for (const key of keys) {
      const value = this.result[key];
      const item = {
        currency: key,
        value
      };
      setTimeout(() => {
        next(item);
      }, 100 * i);
      i++;
    }
    setTimeout(() => {
      complete(size);
    }, 100 * i);
  }

  transformObjectToArray(obj) {
    const items = [];
    const keys = Object.keys(obj);

    for (const key of keys) {
      const value = obj[key];
      const item = {
        currency: key,
        value
      }
      items.push(item)
    }
    return items;
  }

  filter(cb) {
    this.result = this.result.filter(cb);
    return this;
  }


  map (cb) {
    this.result = this.result.map(cb);
    return this;
  }

}