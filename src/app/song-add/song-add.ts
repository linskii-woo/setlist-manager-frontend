import { Component } from '@angular/core';

@Component({
  selector: 'app-song-add',
  imports: [],
  templateUrl: './song-add.html',
  styleUrl: './song-add.css'
})
export class SongAdd {
  song = {
    title: '',
    artist: '',
    status: 'Neu'
  };

  addSong(): void {
    console.log('Neuer Song:', this.song);
  }
}