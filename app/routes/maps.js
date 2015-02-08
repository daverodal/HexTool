import Ember from 'ember';
export default Ember.Route.extend({
  model: function() {
      var that = this;
      var ret = this.store.find('map');
      ret.then(function(myModel){
      },function(){
            that.transitionTo('login');
      });
    return ret;
  }
});
