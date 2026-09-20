import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend';
import { Song } from '../shared/song';


@Component({
  selector: 'app-song-list',
  imports: [RouterLink],
  templateUrl: './song-list.html',
  styleUrl: './song-list.css'
})
export class SongList implements OnInit {

  private bs = inject(BackendService);
  songs: Song[] = [];

  ngOnInit(): void {
    this.bs.getAll()
    .then( response => this.songs = response )
    .then( songs => console.log('songs in SongList:', songs ))

  }
}





  
  