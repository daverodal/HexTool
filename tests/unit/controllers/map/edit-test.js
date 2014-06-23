import { test, moduleFor } from 'ember-qunit';
import Edit from '../../../../controllers/map/edit';
import Ember from "ember";
var get = Ember.get;

moduleFor("controller:map/edit","controller/map/edit edit controller Test ",{
    needs:['controller:map']

});

test("Can I find the controller",function(){
    ok(this.subject() instanceof Edit, "can find the controller");
});

test("can i get the halfHexHeight?", function(){
    equal(get(this.subject(),'halfHexagonHeight'),false, "Can't get halfHexHeight");
});
test("is OriginX a NaN", function(){
    var output = this.subject().get('originX');
    equal(typeof output, 'boolean', 'OriginX is supposed to be a NaN');
});
test("Can send incX and decX, incY, decY, action", function(){
    expect(6);
    var mySub = this.subject({
        model:{
            x:2,
            y:39
        }
    });
    equal(mySub.get('x'), 2, 'x set');
    mySub.send('incX');

    equal(mySub.get('x'), 3, 'x incremented set');
    mySub.send('decX');
    equal(mySub.get('x'), 2, 'x set');

    equal(mySub.get('y'), 39, 'y set');
    mySub.send('incY');

    equal(mySub.get('y'), 40, 'y incremented set');
    mySub.send('decY');
    equal(mySub.get('y'), 39, 'y decremented');


});

test("Can send decHexSize and incHexSize", function(){
    expect(3);
    var mySub = this.subject({
        model:{
            hexSize:32
        }
    });
    equal(mySub.get('hexSize'), 32, 'hesSize set');
    mySub.send('incHexSize');

    equal(mySub.get('hexSize'), 33, 'hexSize incremented set');
    mySub.send('decHexSize');
    equal(mySub.get('hexSize'), 32, 'hexSize decremented');


});