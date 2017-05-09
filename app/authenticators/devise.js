import config from '../config/environment';
import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import Ember from 'ember';


export default DeviseAuthenticator.extend({
  serverTokenEndpoint: `${config.thorn}/users/sign_in`,
  invalidate() {
    return Ember.$.ajax({
      url: `${config.thorn}/users/sign_out`,
      type: 'DELETE'
    }).catch(() => {});
  }
});
