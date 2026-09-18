import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongAdd } from './song-add';

describe('SongAdd', () => {
  let component: SongAdd;
  let fixture: ComponentFixture<SongAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(SongAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
