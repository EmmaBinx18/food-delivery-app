import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/authentication/authentication.service';
import { Role } from 'src/app/core/models/role.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userRole: Role;

  @ViewChild('nav', { static: false }) nav: ElementRef;
  @ViewChild('burgerMenu', { static: false }) burgerMenu: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.userRole = this.authService.getCurrentRole();
  }

  logout() {
    this.authService.logout();
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.innerWidth > 800 && this.burgerMenu.nativeElement.style.display == "block") {
  //     this.renderer.setStyle(this.nav.nativeElement, 'display', 'inline');
  //   }
  // }

  openNav() {
    this.renderer.setStyle(this.nav.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.burgerMenu.nativeElement, 'display', 'none');
  }

  closeNav() {
    this.renderer.setStyle(this.nav.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.burgerMenu.nativeElement, 'display', 'block');
  }

}
