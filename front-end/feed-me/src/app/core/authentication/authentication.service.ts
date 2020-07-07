import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from '../services/user.service';
import { Role } from '../models/role.enum';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private _currentUser: any = null;
    private _currentRole: Role = Role.Customer;

    constructor(
        public firebaseAuth: AngularFireAuth,
        public router: Router,
        private userService: UserService
    ) {
        this.firebaseAuth.authState.subscribe(user => {
            if (user) {
                this._currentUser = user;
                localStorage.setItem('user', JSON.stringify(this._currentUser));
                this._currentRole = JSON.parse(localStorage.getItem('role'));
            } else {
                this._currentUser = null;
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                this.router.navigate(['/login']);
            }
        });
    }

    getCurrentUser() {
        return this._currentUser;
    }

    getCurrentRole() {
        return this._currentRole;
    }

    getUser(uid: string) {
        return this.userService.getUser(uid)
            .then(response => {
                return response;
            })
            .catch(() => {
                throw new Error;
            })
    }

    login(login: any) {
        return this.firebaseAuth.signInWithEmailAndPassword(login.email, login.password)
            .then(response => {
                this.getUser(response.user.uid)
                    .then(res => {
                        console.log(res);
                        this._currentUser = response.user;
                        this._currentRole = res[0].roleid;
                        localStorage.setItem('user', JSON.stringify(this._currentUser));
                        localStorage.setItem('role', res[0].roleid);
                        this.router.navigate(['/home']);
                        //TODO: Check is user is active or not
                    })
                    .catch(error => {
                        throw (error);
                    });
            })
            .catch(error => {
                throw (error.message);
            });
    }

    signup(user: User) {
        return this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then(response => {
                response.user.updateProfile({
                    displayName: `${user.firstname} ${user.lastname}`
                });

                user.uid = response.user.uid;
                this.userService.insertUser(user)
                    .then(() => {
                        this._currentRole = Role.Customer;
                        this._currentUser = response.user;
                        localStorage.setItem('user', JSON.stringify(this._currentUser));
                        localStorage.setItem('role', JSON.stringify(Role.Customer));
                        this.router.navigate(['/home']);
                    })
                    .catch(error => {
                        throw (error);
                    });
            })
            .catch(error => {
                throw (error.message);
            });
    }

    logout() {
        this.firebaseAuth.signOut()
            .then(() => {
                this._currentUser = null;
                localStorage.removeItem('user');
                localStorage.removeItem('role');
                this.router.navigate(['/login']);
            });
    }
}