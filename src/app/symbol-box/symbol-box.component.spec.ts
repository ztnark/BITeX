import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolBoxComponent } from './symbol-box.component';

describe('SymbolBoxComponent', () => {
  let component: SymbolBoxComponent;
  let fixture: ComponentFixture<SymbolBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
