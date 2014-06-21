var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource('maps', function () {
    this.route('new');
    this.resource('map', {path: ":map_id"}, function () {
      this.route('edit');
      this.route('hexes');
    });
  });
  this.resource('login');
});

export default Router;
