import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertsubcategoryComponent } from './insertsubcategory.component';

describe('InsertsubcategoryComponent', () => {
  let component: InsertsubcategoryComponent;
  let fixture: ComponentFixture<InsertsubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertsubcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
