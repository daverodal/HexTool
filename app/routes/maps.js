export default Ember.Route.extend({
  model: function() {
      var ret = this.store.find('map');
      ret.then(function(){
      },function(){
          alert("Please Login");
          window.location = "/";
      });
    return ret;
  }
});
