import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend';
import { Song } from '../shared/song';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-song-add',
  imports: [FormsModule],
  templateUrl: './song-add.html',
  styleUrl: './song-add.css'
})
export class SongAdd {
  private bs = inject(BackendService);
  private router = inject(Router);

  song: Song = {
    title: '',
    artist: '',
    status: 'Neu'
  };

  addSong(): void {
    this.bs.create(this.song)
    .then( () => this.router.navigate(['/songs']))  }
}