import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('basics');
  this.route('examples');
  this.route('scenarios', function() {
    this.route('nested-wormholes');
  });
});

export default Router;
