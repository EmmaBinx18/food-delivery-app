import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`api/user`).toPromise();
  }

  getUser(uid: string) {
    return this.http.get(`api/user/${uid}`).toPromise();
  }

  insertUser(user: User) {
    return this.http.post(`api/user`, { params: this._mapUserObject(user) }).toPromise();
  }

  updateUser(user: User) {
    return this.http.patch(`api/user`, { params: this._mapUserObject(user) }).toPromise();
  }

  deactivateUser(uid: string) {
    return this.http.get(`api/user/${uid}/deactivate`).toPromise();
  }

  reactivateUser(uid: string){
    return this.http.get(`api/user/${uid}/reactivate`).toPromise();
  }

  private _mapUserObject(user: User) {
    return {
      userId: user.uid,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email
    }
  }
}
