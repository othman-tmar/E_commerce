import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesubcategoryComponent } from './updatesubcategory.component';

describe('UpdatesubcategoryComponent', () => {
  let component: UpdatesubcategoryComponent;
  let fixture: ComponentFixture<UpdatesubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesubcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatesubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
