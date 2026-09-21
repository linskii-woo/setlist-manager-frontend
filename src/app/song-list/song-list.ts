import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);
  songs: Song[] = [];

   ngOnInit(): void {
    this.bs.getAll()
    .then( response => {
      this.songs = response;
      this.cdr.detectChanges();
    })
  }
  delete(id: string): void {
    this.bs.deleteOne(id)
    .then( ()=> {
      this.bs.getAll()
      .then( response=> {
        this.songs = response;
        this.cdr.detectChanges();
      })
    })
  }
}





  
  