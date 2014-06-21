import { test, moduleFor } from 'ember-qunit';
import HexStr from '../../../transforms/hex-str';
moduleFor('transform:hex-str', 'transform:hex-str', {
});

test('should return an empty array for a [] str', function() {
    var transform = this.subject();//this.container.lookup('transform:hex-str');

    var expected  = [];
    var output = transform.deserialize("[]");

    deepEqual(output, expected, 'should return an empty array');
});

test('should return an array for a [1,2,3] str', function() {
    var transform = this.container.lookup('transform:hex-str');

    var expected  = [1,3,4];
    var output = transform.deserialize("[1,3,4]");

    deepEqual(output, expected, 'should return an empty array');
});

test(' Should be able to serialize and deserialze an object to self', function() {
    var transform = this.container.lookup('transform:hex-str');

    var expected  = [1,3,{love:2,peace:3,linux:5},4];
    var output = transform.deserialize(transform.serialize(expected));

    deepEqual(output, expected, 'should return same object');
});

test(' Should be able to deserialize and serialze an string to self', function() {
    var transform = this.container.lookup('transform:hex-str');

    var expected  = '[1,2,3,{"a":"b","c":"d"},3]';
    var output = transform.serialize(transform.deserialize(expected));

    deepEqual(output, expected, 'should return same object');
});