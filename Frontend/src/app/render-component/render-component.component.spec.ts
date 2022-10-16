import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderComponentComponent } from './render-component.component';

describe('RenderComponentComponent', () => {
  let component: RenderComponentComponent;
  let fixture: ComponentFixture<RenderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenderComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
