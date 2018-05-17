import Component from '@ember/component';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import config from '../../config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  i18n: service(),

  locale: computed('i18n', function(){ return this.get('i18n.locale')} ),

  didReceiveAttrs: async function() {
    this._super(...arguments);
    let selectedTask = this.get('selectedTask');
    if(selectedTask && selectedTask.result){
      const dataUrl = `${config.caipirinha}/visualizations/${this.get('jobId')}/${selectedTask.id}`;
      this.set('viz', {
        component: `visualizations/${selectedTask.operation.slug}`
          .replace('bar-chart', 'vertical-bar-chart')
          .replace('summary-statistics', 'table-visualization')
      });

      // Get data from API
      const data = await $.get({
        url: dataUrl,
        error(err) { throw err; },
      });

      if(selectedTask.operation.slug.toLowerCase() === 'map-chart') {
        // mode is polygon and geojson
        if(data.mode.polygon && data.geojson && data.geojson.url) {
          data.geojsonProperty = data.geojson.idProperty;

          // stash
          const headers = locale = $.ajaxSettings.headers;
          for(const header in headers) { delete $.ajaxSettings.headers[header]; }

          delete $.ajaxSettings.headers.Locale;

          data.geojson = await $.get({
            url: data.geojson.url,
            error(err) {
              console.log(err);
              throw err;
            }
          });

          // restore
          $.ajaxSettings.headers = headers;

          data.geojson.features = data.geojson.features.filter(function(d) { return d.geometry; });

          // converts linestrings to polygons
          data.geojson.features.forEach(function(feature, idx) {
            if(feature.geometry.type.toLowerCase() === 'linestring') {
              const coordinates = feature.geometry.coordinates;
              feature.geometry.coordinates = [];

              feature.geometry.type = 'Polygon';
              feature.geometry.coordinates.push(coordinates);

              data.geojson.features[idx] = feature;
            }
          });
        }
      }

      this.set('data', data);
    }
  },

  didRender(){
    $('a[href$="#params"]').click(function(){ $('.form-inline').find('*').prop('disabled', true) })
    $('#tabs ul li a').removeClass('active');
    $('#tabs ul li a[href="#'+ this.get('activeTab') +'"]').addClass('active');
    $('.card-body .table').addClass('table-sm table-hover');
    var height = $('.tab-content').height();
    var width = $('.tab-content').width();
    $('#display-modal').height(height);
    $('#display-modal').width(width);
    var tables =  $('.table-wrapper');
    var card = $('.card').outerHeight(true);
    for(var i=0; i < tables.length; i++){
      $(`#${tables[i].id}`).height(height - tables.length*card );
    }
  },

  actions: {
    close(){
      this.set('selectedTask', null);
      this.set('taskModal', false);
    },
    activateTab(tab){
      this.get('activateTab')(tab);
      return tab;
    }
  }
});
