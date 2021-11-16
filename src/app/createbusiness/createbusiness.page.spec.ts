import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatebusinessPage } from './createbusiness.page';

describe('CreatebusinessPage', () => {
  let component: CreatebusinessPage;
  let fixture: ComponentFixture<CreatebusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatebusinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatebusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
