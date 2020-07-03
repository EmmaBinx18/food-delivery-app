import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Renderer2, HostListener, Output } from '@angular/core';

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
  @ViewChild('header', { static: false }) header: ElementRef;

  @Output() openCartEmitter = new EventEmitter();
  @Output() changeDisplayEmitter = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.userRole = this.authService.getCurrentRole();
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 800 && this.nav.nativeElement.style.left == "-200rem") {
      this.renderer.setStyle(this.nav.nativeElement, 'left', '0');
      this.renderer.removeClass(this.header.nativeElement, 'full-height');
    }
  }

  openNav() {
    this.renderer.setStyle(this.nav.nativeElement, 'left', '0');
    this.renderer.addClass(this.header.nativeElement, 'full-height');
  }

  closeNav() {
    this.renderer.setStyle(this.nav.nativeElement, 'left', '-200rem');
    this.renderer.removeClass(this.header.nativeElement, 'full-height');
  }

  openCart() {
    this.openCartEmitter.emit();
  }

  changeDisplay(option: string) {
    this.changeDisplayEmitter.emit(option);
  }

}
