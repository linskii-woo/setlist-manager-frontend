import { Routes } from '@angular/router';
import { SongList } from './song-list/song-list';
import { SongAdd } from './song-add/song-add';
import { SongEdit } from './song-edit/song-edit';

export const routes: Routes = [
  { path: 'songs', component: SongList },
  { path: 'add', component: SongAdd },
  { path: 'edit/:id', component: SongEdit }
];