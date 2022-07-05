import type { User } from '@auth0/auth0-spa-js';
import { writable } from 'svelte/store';
import type { Checkin } from './checkin';

export const isAuthenticated = writable(false);
export const user = writable<User>();
export const popupOpen = writable(false);
export const error = writable();

export const checkins = writable<Checkin[]>([
  {
    first_name: 'Some',
    last_name: 'Person',
    confirmation_number: '123456789',
    checkin_available_epoch: 1657060800
  }
]);
