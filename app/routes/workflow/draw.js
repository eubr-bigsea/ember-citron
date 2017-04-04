import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    return RSVP.hash({
      workflow: this.get('store').findRecord('workflow', params.id),
      operations: this.store.query('operation',{platform: params.platform}),
      groupedOperations: groupBy(this.store.query('operation',{platform: params.platform}), 'categories'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    if(!this.get('currentModel.workflow.image')) {
      this.set('currentModel.workflow.image', 'img1.png');
    }
  },

  actions: {
    willTransition(transition){
      var targetName = this.controller.get('targetName');
      var hasChanged = this.controller.get('hasChanged');
      if(!targetName && (transition.targetName !== 'job.show') && hasChanged){
        this.controller.set('targetName', transition.targetName);
        transition.abort();
        this.controller.set('modal3', true);
      }
    }
  }
});
