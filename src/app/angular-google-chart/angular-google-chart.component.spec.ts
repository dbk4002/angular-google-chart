import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularGoogleChartComponent } from './angular-google-chart.component';

describe('AngularGoogleChartComponent', () => {
  let component: AngularGoogleChartComponent;
  let fixture: ComponentFixture<AngularGoogleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularGoogleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularGoogleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
