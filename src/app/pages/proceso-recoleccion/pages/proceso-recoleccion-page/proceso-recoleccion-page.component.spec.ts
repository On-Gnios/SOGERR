import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoRecoleccionPageComponent } from './proceso-recoleccion-page.component';

describe('ProcesoRecoleccionPageComponent', () => {
  let component: ProcesoRecoleccionPageComponent;
  let fixture: ComponentFixture<ProcesoRecoleccionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoRecoleccionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoRecoleccionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
