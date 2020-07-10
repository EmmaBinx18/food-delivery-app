import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

<<<<<<< HEAD
=======
import { SharedModule } from './shared/shared.module';
import { CartModule } from './modules/cart/cart.module';
import { AuthGuard } from './core/authentication/auth.guard';
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974
import { AuthService } from './core/authentication/authentication.service';
import { MapComponent } from './modules/map/map.component';

@NgModule({
<<<<<<< HEAD
  declarations: [AppComponent, MapComponent],
=======
  declarations: [AppComponent],
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    SharedModule,
    CartModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
