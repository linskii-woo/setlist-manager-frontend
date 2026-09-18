import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-song-edit',
  templateUrl: './song-edit.html',
  styleUrl: './song-edit.css'
})
export class SongEdit {
  song = {
    title: 'Song 1',
    artist: 'Künstler 1',
    status: 'Neu'
  };

  updateSong(): void {
    console.log('Song aktualisiert:', this.song);
  }
}