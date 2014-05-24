export default Ember.ObjectController.extend({
  actions: {
    save: function () {
      var that = this;
      var model = this.store.createRecord('map', {mapWidth:"width:auto",mapUrl: "http://davidrodal.com/Battle/js/MCW.png"});
      model.save().then(function () {
          that.transitionToRoute('map', model.get('id'));
        }
      );
    }
  }
});