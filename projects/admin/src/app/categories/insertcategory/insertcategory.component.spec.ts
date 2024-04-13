import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertcategoryComponent } from './insertcategory.component';

describe('InsertcategoryComponent', () => {
  let component: InsertcategoryComponent;
  let fixture: ComponentFixture<InsertcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
