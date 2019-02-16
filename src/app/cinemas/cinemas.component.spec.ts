import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CinemasComponent } from './cinemas.component';
import { NavbarComponent } from '../navbar/navbar.component';

describe('CinemasComponent', () => {
  let component: CinemasComponent;
  let fixture: ComponentFixture<CinemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CinemasComponent,
        NavbarComponent
        ],
      imports: [ 
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
