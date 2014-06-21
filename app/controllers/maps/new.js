export default Ember.ObjectController.extend({
    actions: {
        save: function () {
            var that = this;
            var model = this.store.createRecord('map', {mapWidth: "width:auto", mapUrl: "http://davidrodal.com/Battle/js/MCW.png"});
            model.save().then(function (model) {
                var map = model;
                var hexStr = that.store.createRecord('hexStr', {map: map, hexEncodedStr: '[]'});
                hexStr.save().then(function (hexStr) {
                    map.set('hexStr', hexStr);
                    map.save().then(function(){
                        that.transitionToRoute('map', model.get('id'));
                    });
                },function(){
                    that.transitionTo('login');
                });
            },function(){
                that.transitionTo('login');
            });
        }
    }
});