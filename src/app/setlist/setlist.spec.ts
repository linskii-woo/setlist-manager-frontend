import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Setlist } from './setlist';

describe('Setlist', () => {
  let component: Setlist;
  let fixture: ComponentFixture<Setlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Setlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Setlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
