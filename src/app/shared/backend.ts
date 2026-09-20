import { Injectable } from '@angular/core';
import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  apiURL = 'http://localhost:3000';

  constructor() { }

  // GET alle Songs
  async getAll(): Promise<Song[]> {
    let response = await fetch(this.apiURL + '/songs');
    let songs = await response.json();
    console.log('songs in service (getAll):', songs);
    return songs;
  }

  // POST einen neuen Song
  async create(newSong: Song): Promise<Song> {
    let response = await fetch(this.apiURL + '/songs', {
      method: 'POST',
      body: JSON.stringify(newSong),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let song = await response.json();
    console.log('song in service (create):', song);
    return song;
  }

  // PATCH einen Song aktualisieren
  async update(id: string, updateData: Song): Promise<Song> {
    let response = await fetch(this.apiURL + '/songs/' + id, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let song = await response.json();
    console.log('song in service (update):', song);
    return song;
  }

  // DELETE einen Song
  async deleteOne(id: string): Promise<void> {
    await fetch(this.apiURL + '/songs/' + id, {
      method: 'DELETE'
    });
  }
}