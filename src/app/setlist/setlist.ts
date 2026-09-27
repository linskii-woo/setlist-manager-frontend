import { Component, OnInit, ChangeDetectorRef, inject, ViewChild, ElementRef } from '@angular/core';
import { BackendService } from '../shared/backend';
import { Song } from '../shared/song';
import Sortable from 'sortablejs';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-setlist',
  styleUrl: './setlist.css',
  templateUrl: './setlist.html',
})
export class Setlist implements OnInit {
private bs =inject(BackendService);
private cdr = inject(ChangeDetectorRef);

songs: Song[] = [];
@ViewChild('setlistRef') setlistRef!: ElementRef;
editingNoteId: string | null = null;
noteDraft: string = '';

get setlist(): Song[] {
  return this.songs.filter(song => song.status === 'Ready');
}

get totalDurationDisplay(): string {
    const totalSeconds = this.setlist.reduce((sum, song) => {
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

 startEditNote(song: Song): void {
    this.editingNoteId = song._id!;
    this.noteDraft = song.note || '';
  }

  saveNote(song: Song): void {
    this.bs.update(song._id!, { ...song, note: this.noteDraft })
    .then(() => {
      song.note = this.noteDraft;
      this.editingNoteId = null;
      this.cdr.detectChanges();
    });
  }

  cancelEditNote(): void {
    this.editingNoteId = null;
  }
}





