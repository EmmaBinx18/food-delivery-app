import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:front-end/feed-me/src/app/modules/home/account/account.component.spec.ts
import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent ]
=======
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ]
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974:front-end/admin/src/app/messages/messages.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:front-end/feed-me/src/app/modules/home/account/account.component.spec.ts
    fixture = TestBed.createComponent(AccountComponent);
=======
    fixture = TestBed.createComponent(MessagesComponent);
>>>>>>> 57ba6553f8b93de297e33165d60a71dd66318974:front-end/admin/src/app/messages/messages.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
