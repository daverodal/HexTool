export default DS.Transform.extend({
    serialize: function(value) {
        return JSON.stringify(value);
    },
    deserialize: function(value) {
        return JSON.parse(value);
    }
});