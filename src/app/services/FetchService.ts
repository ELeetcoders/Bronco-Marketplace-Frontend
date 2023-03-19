import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private fetching: boolean;

  constructor() { }

  setMyVariable(value: boolean) {
    this.fetching = value;
  }

  getMyVariable() {
    return this.fetching;
  }
}