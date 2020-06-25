import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserService } from '../services/user.service';
import { Role } from '../models/role';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    currentUser: any;
    currentRole: Role;

    constructor(
        public firebaseAuth: AngularFireAuth,
        public router: Router,
        private userService: UserService
    ) {
        this.currentRole = Role.Customer;
        this.firebaseAuth.authState.subscribe(user => {
            if (user) {
                this.currentUser = user;
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                // this.currentRole = this.getUser(this.currentUser.uid)['role'];
            } else {
                localStorage.setItem('user', null);
            }
        });
    }

    getUser(uid: string) {
        this.userService.getUser(uid)
            .then(response => {
                return response;
            })
            .catch(() => {
                throw Error;
            })
    }

    login(login: any) {
        this.firebaseAuth.signInWithEmailAndPassword(login.email, login.password)
            .then(response => {
                console.log(response);
                // this.currentRole = this.getUser(response.user.uid)['role'];
                this.currentRole = Role.Customer;
                this.router.navigate(['/home']);
            })
            .catch(error => {
                console.log(error);
                this.router.navigate(['/login']);
            });
    }

    signup(user: User) {
        this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then(response => {
                response.user.updateProfile({
                    displayName: `${user.firstname} ${user.lastname}`
                });

                user.uid = response.user.uid;
                this.userService.addUser(user);

                this.currentUser = response;
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                this.currentRole = Role.Customer;
                this.router.navigate(['/home']);
            })
            .catch(error => {
                console.error(error);
                this.router.navigate(['/login']);
            });
    }

    // async sendEmailVerification() {
    //     await (await this.firebaseAuth.currentUser).sendEmailVerification();
    //     this.router.navigate(['admin/verify-email']); //Change router according to user
    // }

    // async sendPasswordResetEmail(passwordResetEmail: string) {
    //     return await this.firebaseAuth.sendPasswordResetEmail(passwordResetEmail);
    // }

    logout() {
        this.firebaseAuth.signOut()
            .then(() => {
                localStorage.removeItem('user');
                this.router.navigate(['/login']);
            });
    }

    // async loginWithGoogle() {
    //     await this.firebaseAuth.signInWithPopup(new auth.GoogleAuthProvider())
    //     this.router.navigate(['admin/list']);
    // }
}