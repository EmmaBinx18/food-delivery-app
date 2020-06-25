import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChefRegisterComponent } from './home-chef-register.component';

describe('HomeChefRegisterComponent', () => {
  let component: HomeChefRegisterComponent;
  let fixture: ComponentFixture<HomeChefRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeChefRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeChefRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
