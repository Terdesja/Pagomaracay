import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessprofilePage } from './businessprofile.page';

describe('BusinessprofilePage', () => {
  let component: BusinessprofilePage;
  let fixture: ComponentFixture<BusinessprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
