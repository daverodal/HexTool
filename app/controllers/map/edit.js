import Ember from "ember";
import HexPick from "../../mixins/hex-pick";
import DrawMixin from "../../mixins/draw";
var $ = Ember.$;
export default Ember.ObjectController.extend(DrawMixin, HexPick, {
    needs: 'map',
    checked:false,
    checkIt:function(){
    }.observes('checked'),
    imageWidth: null,
    imageHeight: null,
    imageC: function () {
        $(".mapImage").error(function(){
        }).load(function(){
        });
        $('.mapImage').load({me:this},function(data){
            var height = $(this).height();
            var width = $(this).width();
            data.data.me.set('imageHeight', height);
            data.data.me.set('imageWidth', width);
        });
    }.observes('mapUrl'),

    actions: {
        save: function () {
            var that = this;
            this.get('hexStr').then(function(){
                that.get('model').save().then(that.transitionToRoute('map'));
            },function(){
                that.transitionTo('login');
            });
        },
        decHexSize: function () {
            this.set('blahblah',3);
            this.set('hexSize', this.get('hexSize') - 1);
        },
        incHexSize: function () {
            this.set('hexSize', this.get('hexSize') - 0 + 1);
        },
        decX: function () {
            this.set('x', this.get('x') - 1);
        },
        incX: function () {
            this.set('x', this.get('x') - 0 + 1);
        },
        decY: function () {
            this.set('y', this.get('y') - 1);
        },
        incY: function () {
            this.set('y', this.get('y') - 0 + 1);
        }

    },
    sizeChanged: function () {
        this.set('perfect', false);
        Ember.run.once(this, 'justOneTime');
    }.observes('imageWidth','imageHeight')
});
