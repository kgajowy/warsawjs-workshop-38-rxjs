import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieLikesComponent } from './movie-likes.component';

describe('MovieLikesComponent', () => {
  let component: MovieLikesComponent;
  let fixture: ComponentFixture<MovieLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
