import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../shared/backend';
import { Song } from '../shared/song';

@Component({
  imports: [FormsModule],
  selector: 'app-song-edit',
  templateUrl: './song-edit.html',
  styleUrl: './song-edit.css'
})
export class SongEdit implements OnInit {
  private bs = inject(BackendService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  id: string | null = '';
  song: Song = { title: '', artist: '', status: 'Neu' };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.bs.getOne(this.id)
      .then( response => {
        this.song = response;
        this.cdr.detectChanges();
      })
    }
  }

  updateSong(): void {
if(this.id) {
      this.bs.update(this.id, this.song)
      .then( () => this.router.navigate(['/songs']))
    }
  }

  cancel(): void {
    this.router.navigate(['/songs']);  }
}
