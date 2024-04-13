import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredproductsBySubComponent } from './filteredproducts-by-sub.component';

describe('FilteredproductsBySubComponent', () => {
  let component: FilteredproductsBySubComponent;
  let fixture: ComponentFixture<FilteredproductsBySubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredproductsBySubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredproductsBySubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
