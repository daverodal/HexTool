import { test, moduleFor } from 'ember-qunit';
import Maps from '../../../routes/maps';

moduleFor('route:maps', 'route:maps', {

});


test('fakes out model hook', function () {
    var route = this.subject({
        model: function(){
            return 'fun-fun-fun';
        }
    });
    expect(1);
    equal(route.model(), 'fun-fun-fun', '0 does = 0');
});

