import { Component, OnInit, ChangeDetectorRef, inject, ViewChild, ElementRef } from '@angular/core';
import { BackendService } from '../shared/backend';
import { Song } from '../shared/song';
import Sortable from 'sortablejs';

@Component({
  imports: [],
  selector: 'app-setlist',
  styleUrl: './setlist.css',
  templateUrl: './setlist.html',
})
export class Setlist implements OnInit {
private bs =inject(BackendService);
private cdr = inject(ChangeDetectorRef);

songs: Song[] = [];
@ViewChild('setlistRef') setlistRef!: ElementRef;

get setlist(): Song[] {
  return this.songs.filter(song => song.status === 'Bereit');
}

ngOnInit(): void {
  this.bs.getAll()
  .then( response => {
    this.songs= response;
    this.cdr.detectChanges();

  })

  .then( () => {
    setTimeout(() => {
    if(this.setlistRef) {
      Sortable.create(this.setlistRef.nativeElement, {
        handle: '.sortier-griff',
        animation:150
      });
    }
    }, 100);
  })
}
}
