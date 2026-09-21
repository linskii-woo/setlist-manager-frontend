import { Component, inject, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend';
import { Song } from '../shared/song';
import Sortable from 'sortablejs';


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

  get setlist(): Song[] {
    return this.songs.filter(song => song.status === 'Bereit');
  }

   ngOnInit(): void {
    this.bs.getAll()
    .then( response => {
      this.songs = response;
      this.cdr.detectChanges();
    })
    .then( () => {
      setTimeout(() => {
                console.log('setlistRef:', this.setlistRef);
        if(this.setlistRef) {
          Sortable.create(this.setlistRef.nativeElement,{
            handle: '.sortier-griff',
            animation:150
          });
        }
      }, 100);
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

  @ViewChild('setlistRef') setlistRef!: ElementRef;

}






  