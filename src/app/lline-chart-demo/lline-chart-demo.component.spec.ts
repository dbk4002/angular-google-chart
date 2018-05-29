import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlineChartDemoComponent } from './lline-chart-demo.component';

describe('LlineChartDemoComponent', () => {
  let component: LlineChartDemoComponent;
  let fixture: ComponentFixture<LlineChartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlineChartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlineChartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
