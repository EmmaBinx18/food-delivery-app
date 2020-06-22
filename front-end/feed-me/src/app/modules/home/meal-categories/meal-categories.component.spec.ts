import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCategoriesComponent } from './meal-categories.component';

describe('MealCategoriesComponent', () => {
  let component: MealCategoriesComponent;
  let fixture: ComponentFixture<MealCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
