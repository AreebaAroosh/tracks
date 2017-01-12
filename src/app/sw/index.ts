import { Injectable, NgModule } from '@angular/core';


import { Store } from '@ngrx/store';
import * as actions from './actions';
import { environment } from '../../environments/environment';


declare var window;

@Injectable()
export class SWService {

  constructor(private store: Store<any>) { }

  connect() {
    // @todo SSR valid code...
    if (!window || !('sworker' in window)) {
      return;
    }
    window.sworker
      .then((r) => this.resolve(r))
      .catch((e) => {
        console.error('Error during service worker registration:', e);
      });
  }

  resolve(reg) {
    reg.onupdatefound = () => {
      let installingWorker = reg.installing;
      installingWorker.onstatechange = () => {
        this.store.dispatch(actions.swStatus(installingWorker.state));
      };
    };
  }

}


@NgModule({
  providers: [SWService]
})
export class SWModule { }
