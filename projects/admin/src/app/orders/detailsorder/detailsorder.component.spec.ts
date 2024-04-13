import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsorderComponent } from './detailsorder.component';

describe('DetailsorderComponent', () => {
  let component: DetailsorderComponent;
  let fixture: ComponentFixture<DetailsorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
