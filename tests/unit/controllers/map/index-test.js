import { test, moduleFor } from 'ember-qunit';
import New from '../../../../controllers/map/index';
import Ember from "ember";
var get = Ember.get;

moduleFor("controller:map/index","controller/map/index index controller Test ",{
    needs:['controller:map']

});

test("Can I find the controller",function(){
    ok(this.subject() instanceof New, "can find the controller");
});

test("can i get the halfHexHeight?", function(){
    equal(get(this.subject(),'halfHexagonHeight'),false, "Can't get halfHexHeight");
});
test("is OriginX a NaN", function(){
    var output = this.subject().get('originX');
    equal(typeof output, 'number', 'OriginX is supposed to be a NaN');
});
test("Can I call myInit on it", function(){
    var mySub = this.subject();
    var expected = 63.10000000000001;
    mySub.myInit(Ember.Object.create({
        a:15.775,
        b:27.323101489399043,
        c:31.55,
        x:0,
        y:0
    }));
    equal(mySub.get('originX'), expected, 'originX set');
});