import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerTracks } from './reducers';

import { Storage } from './storage';

import * as router from '../router/reducer';
import { swreducer } from '../sw/reducer';
import { reducerGDrive } from '../drive/reducers';

@NgModule({
  imports: [
    StoreModule.provideStore({
      data: reducerTracks,
      router: router.reducer,
      sw: swreducer,
      gdrive: reducerGDrive,
    }),
    EffectsModule.run(Storage)
  ]
})
export class TracksStoreModule {}
