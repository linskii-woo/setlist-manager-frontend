import { Component, inject, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackendService } from '../shared/backend';
import { Song } from '../shared/song';
import Sortable from 'sortablejs';
import { FormsModule } from '@angular/forms';
 

@Component({
  selector: 'app-song-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './song-list.html',
  styleUrl: './song-list.css'
})
export class SongList implements OnInit {

  private bs = inject(BackendService);
  private cdr = inject(ChangeDetectorRef);
  songs: Song[] = [];

  get setlist(): Song[] {
    return this.songs.filter(song => song.status === 'Ready');
  }

  selectedStatus: string='All';
  get filteredSongs(): Song[] {
    if(this.selectedStatus === 'All') {
      return this.songs;
    }
    return this.songs.filter(song => song.status === this.selectedStatus);
  }

  get totalDurationDisplay(): string {
    const totalSeconds = this.filteredSongs.reduce((sum, song) => {
      return sum + this.parseDuration(song.duration);
    }, 0);
    return this.formatDuration(totalSeconds);
  }

  private parseDuration(duration?: string): number {
    if (!duration) return 0;
    const parts = duration.split(':');
    if (parts.length !== 2) return 0;
    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);
    if (isNaN(minutes) || isNaN(seconds)) return 0;
    return minutes * 60 + seconds;
  }

  private formatDuration(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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






  