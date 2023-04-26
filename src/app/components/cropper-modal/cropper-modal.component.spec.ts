import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperModalComponent } from './cropper-modal.component';

describe('CropperModalComponent', () => {
  let component: CropperModalComponent;
  let fixture: ComponentFixture<CropperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CropperModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
