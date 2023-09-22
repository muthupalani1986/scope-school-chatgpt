import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  public setItem(keyName: string, value = {}) {
    localStorage.setItem(keyName, JSON.stringify(value));
  }
  public getItem(keyName: string): any {
    const res: any = localStorage.getItem(keyName);
    return JSON.parse(res);
  }
  public removeItem(keyName: string): any {
    localStorage.removeItem(keyName);
  }
  public clear(){
    localStorage.clear();
  }
}
