import { Injectable } from '@angular/core';

import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  storageRef: AngularFireStorageReference;

  constructor(public storage: AngularFireStorage) { }

  // getAllCategoryImages() {
  //   this.storageRef = this.storage.ref('categories-images/asian.jpg');
  //   this.storageRef.getDownloadURL().subscribe(url => console.log(url));
  // }

  getCategoryImage(category: string) {
    this.storageRef = this.storage.ref(`categories-images/${category}.jpg`);
    return this.storageRef.getDownloadURL().subscribe(url => { return url });
  }
}
