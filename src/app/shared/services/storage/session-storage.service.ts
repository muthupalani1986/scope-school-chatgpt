import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }
  public setItem(keyName: string, value = {}) {
    sessionStorage.setItem(keyName, JSON.stringify(value));
  }
  public getItem(keyName: string): any {
    const res: any = sessionStorage.getItem(keyName);
    return JSON.parse(res);
  }
  public removeItem(keyName: string): any {
    sessionStorage.removeItem(keyName);
  }
  public clear(){
    sessionStorage.clear();
  }
}
