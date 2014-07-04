import Ember from 'ember';

var Router = Ember.Router.extend({
    location: HexToolENV.locationType

});

Router.map(function() {
  this.resource('maps', function () {
    this.route('new');
    this.resource('map', {path: ":map_id"}, function () {
      this.route('edit');
      this.route('hexes');
      this.route('delete');
    });
  });
  this.resource('login');
});

export default Router;
