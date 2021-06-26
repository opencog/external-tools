import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlConnectComponent } from './url-connect.component';

describe('UrlConnectComponent', () => {
  let component: UrlConnectComponent;
  let fixture: ComponentFixture<UrlConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
