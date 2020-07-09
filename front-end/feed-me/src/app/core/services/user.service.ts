import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${environment.api}/user`).toPromise();
  }

  getUser(uid: string) {
    return this.http.get(`${environment.api}/user/${uid}`).toPromise();
  }

  insertUser(user: User) {
    return this.http.post(`${environment.api}/user`, { params: this._mapUserObject(user) }).toPromise();
  }

  updateUser(user: User) {
    return this.http.patch(`${environment.api}/user`, { params: this._mapUserObject(user) }).toPromise();
  }

  deactivateUser(uid: string) {
    return this.http.post(`${environment.api}/user/deactivate`, { params: uid }).toPromise();
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
