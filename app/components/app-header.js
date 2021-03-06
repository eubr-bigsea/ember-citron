import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service(),
  sessionAccount: service(),

  actions: {
    invalidateSession(){
      this.get('session').invalidate();
    }
  }
});
