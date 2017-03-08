import Ember from 'ember';
import config from '../../config/environment';

const { inject: { service }, $:{ajax} } = Ember;

export default Ember.Component.extend({
  classNames:['row', 'option-bar'],
  currentUser: service('current-user'),
  hasFinished: null,
  hasFailed: null,
  isRunning: null,

  didReceiveAttrs(){
    var jobStatus = this.get('job.status');
    this.set('isRunning', (jobStatus === 'running'));
    this.set('hasFinished', (jobStatus === 'completed'));
    this.set('hasFailed', (jobStatus === 'canceled'));
  },
  didUpdate(){
    var jobStatus = this.get('job.status');
    this.set('isRunning', (jobStatus === 'running'));
    this.set('hasFinished', (jobStatus === 'completed'));
    this.set('hasFailed', (jobStatus === 'canceled'));
  },

  actions:{
    stop(){
      let jobId = this.get('job.id');
      let workflowId = this.get('job.workflow.id');
      let component = this;
      let currentUser = this.get('currentUser');
      ajax({
        url: `${config.stand}/jobs/${jobId}/stop`,
        type: 'POST',
        data: {},
        beforeSend: function(request) {
          request.setRequestHeader('X-Auth-Token', '123456');
          request.setRequestHeader('access-token', currentUser.accessToken);
          request.setRequestHeader('client', currentUser.client);
          request.setRequestHeader('expire', currentUser.expire);
          request.setRequestHeader('uid', currentUser.uid);
          request.setRequestHeader('token-type', currentUser.tokenType);
        },
      }).then(function(){Ember.getOwner(component).lookup('router:main').transitionTo('workflow.draw', workflowId);});
    },
  },
});
