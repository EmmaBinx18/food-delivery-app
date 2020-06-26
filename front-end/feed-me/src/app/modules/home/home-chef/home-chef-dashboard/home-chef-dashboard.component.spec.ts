import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChefDashboardComponent } from './home-chef-dashboard.component';

describe('HomeChefDashboardComponent', () => {
  let component: HomeChefDashboardComponent;
  let fixture: ComponentFixture<HomeChefDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeChefDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeChefDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
