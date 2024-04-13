import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsubcategoriesComponent } from './listsubcategories.component';

describe('ListsubcategoriesComponent', () => {
  let component: ListsubcategoriesComponent;
  let fixture: ComponentFixture<ListsubcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsubcategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsubcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
