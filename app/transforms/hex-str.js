export default DS.Transform.extend({
    serialize: function(value) {
        debugger;
        return JSON.stringify(value);
    },
    deserialize: function(value) {
        debugger;
        return JSON.parse(value);
    }
});