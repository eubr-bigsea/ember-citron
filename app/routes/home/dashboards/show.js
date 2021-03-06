import Route from '@ember/routing/route';
import config from '../../../config/environment';
import $ from 'jquery';

export default Route.extend({
  model: async function(params) {
    const model = await this.store.findRecord('dashboard', params.id);

    for(const v of model.visualizations) {
      // Set component name for data visualization
      v.component = ['visualizations',v.type.name]
        .join('/')
        .replace('bar-chart', 'vertical-bar-chart');

      // Get configuration
      const conf = model.configuration == null ? {} : model.configuration;
      const item = conf[`${v.id}`] == null ? {} : conf[`${v.id}`];

      // Set initial style and layouts
      v.x = item.x == null || isNaN(+item.x) ? 0 : +item.x;
      v.y = item.y == null || isNaN(+item.y) ? 0 : +item.y;
      v.width = item.width == null || isNaN(+item.width) ? 4 : +item.width;
      v.height = item.height == null || isNaN(+item.height) ? 4 : +item.height;
      v.height = v.height < 4 ? 4 : v.height;

      // Set data url
      const dataUrl = [
        config.caipirinha,
        "visualizations",
        v.job_id,
        v.task_id
      ].join('/');

      const visData = await $.get({
        url: dataUrl,
        beforeSend(request) {
          request.setRequestHeader('X-Auth-Token', '123456');
        },
        error(err) { throw(err); }
      });

      if(visData.mode && visData.mode.polygon && visData.geojson && visData.geojson.url) {
        visData.geojsonProperty = visData.geojson.idProperty;

        // stash
        const headers = $.ajaxSettings.headers;
        for(const header in headers) { delete $.ajaxSettings.headers[header]; }
        delete $.ajaxSettings.headers.Locale;

        const geojson = await $.get({
          url: visData.geojson.url,
          error(err) { throw err; },
        });

        visData.geojson = geojson;

        visData.geojson.features.forEach((feature, idx) => {
          if(feature.geometry && feature.geometry.type.toLowerCase() === 'linestring') {
            const coordinates = feature.geometry.coordinates;
            feature.geometry.coordinates = [];

            feature.geometry.type = 'Polygon';
            feature.geometry.coordinates.push(coordinates);

            visData.geojson.features[idx] = feature;
          }
        });

        // restore
        $.ajaxSettings.headers = headers;
      }

      v.data = visData;
    }

    return model;
  },
});
