import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service(),

  init() {
    this._super(...arguments);
  },

  // Attributes bingins
  width:  function(){ return this.get('width'); }.property('width'),
  height: function(){ return this.get('height'); }.property('height'),
  _id:    function(){ return this.get('_id'); }.property('_id'),
  style:  function(){ return "width:"+this.get('width')+"; height:"+this.get('height')+";"; }.property('style'),

  // Chart var
  _var: null,

  // Draw Chart
  draw: function(){
    let component = this;

    Ember.$.ajax({
      url: component.get('dataUrl'),
      type: "GET",
      data: {},
      beforeSend: (request) => {
        gViz.helpers.loading.show();

        request.setRequestHeader('X-Auth-Token', '123456');
        request.setRequestHeader('Authorization', `Token token=${component.get('session.data.authenticated.token')} email=${component.get('session.data.authenticated.email')}`);
      },
      success: (data) => {

        // Set title
        component.set('title', data.title);

        let parseData = function(d, label, value) {
          d["label"]   =  d[label];
          d["value"]   = +d[value];

          if(label !== "label") { delete(d[label]); }

          if(value !== "value") { delete(d[value]); }

          return d;
        };

        // Walter data
        var label = "name";
        var value = "value";


        // Get data
        var data2 = data.data;
        data2.map(function(d) { parseData(d, label, value); });

        component._var = gViz.vis.pie_chart()
          ._var(component._var)
          ._class("pie-chart")
          .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
          .data(data2)
          .build();

      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        gViz.helpers.loading.hide();
      },
    });

  },

  didInsertElement: function(){
    this.draw();
  }
});
