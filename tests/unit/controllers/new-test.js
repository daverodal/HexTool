import { test, moduleFor } from 'ember-qunit';
import New from '../../../controllers/maps/new';
import Ember from "ember";
var get = Ember.get;

moduleFor("controller:maps/new","controllers/maps/new Draw Mixin Test ",{

});

test("Can I find the controller",function(){
    ok(this.subject() instanceof New, "can find the controller");
});
