import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-song-list',
  imports: [RouterLink],
  templateUrl: './song-list.html',
  styleUrl: './song-list.css'
})
export class SongList {
  songs = [
    { title: 'Song 1', artist: 'Künstler 1', status: 'Bereit' },
    { title: 'Song 2', artist: 'Künstler 2', status: 'In Arbeit' },
    { title: 'Song 3', artist: 'Künstler 3', status: 'Neu' }
];
}