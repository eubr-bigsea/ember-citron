import config from '../../config/environment';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);

    return {
      component: `visualizations/${params.which}`,
      url: `${config.ai_social_rails}/json/${params.id}/${params.which}.json`
    };
  }
});
