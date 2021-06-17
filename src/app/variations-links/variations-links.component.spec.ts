import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationsLinksComponent } from './variations-links.component';

describe('VariationsLinksComponent', () => {
  let component: VariationsLinksComponent;
  let fixture: ComponentFixture<VariationsLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariationsLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationsLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
