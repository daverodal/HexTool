import Ember from "ember";
export default Ember.ObjectController.extend( {
  reallyReallyDelete:false,
  actions:{
    doTest:function(){
      var that = this;
      this.get('hexStr').then(function(hexStr){
        hexStr.destroyRecord().then(function(){
          that.get('model').destroyRecord().then(function(){
            that.transitionToRoute('maps');
          });
        });
      });
    }
  },
  killIt:function(){
    if(this.get('reallyReallyDelete') === 'Yes') {
      /* very round about way of doing things, so that "that" would be set :( */
      this.send('doTest');
      this.set('reallyReallyDelete', false);
      return;
    }
  }.observes('reallyReallyDelete')
});