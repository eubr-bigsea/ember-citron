import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$("#sidebar-menu").metisMenu();
  }
});
