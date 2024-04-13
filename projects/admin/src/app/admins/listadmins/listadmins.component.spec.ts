import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadminsComponent } from './listadmins.component';

describe('ListadminsComponent', () => {
  let component: ListadminsComponent;
  let fixture: ComponentFixture<ListadminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
