import HexPart from "../mixins/hex-part";
export default Ember.Object.create({
    x:false,
    y:false,
    refHexpartX:false,
    refHexpartY:false,
    hexpartType:false,
    name:false,
    prefix:false,

    hexpartInit:function(){
// HexPart(name)
        if ( HexPart.arguments.length === 1 )
        {
            this.name = HexPart.arguments[0];
            this.calculateHexpart();
        }

// HexPart(x,y)
        if ( HexPart.arguments.length === 2 )
        {
            this.x = HexPart.arguments[0];
            this.y = HexPart.arguments[1];

            this.calculateHexpartType();
            this.calculateHexpartName();
        }
    },

    setXY:function(x, y)
    {
        this.set('x', x);
        this.set('y',y);

        this.calculateHexpartType();
//    this.calculateHexpartName();
    },

    setName:function( hexpartName )
    {
        this.name = hexpartName;

        this.calculateHexpart();
    },

    calculateHexpartType:function() {

        // center = 1, lower = 2, lower left = 3, upper left = 4
        this.set('hexpartType', 0);

        // 8 cases
        switch ( this.get('x') % 4 ) {
            case 0:
                switch ( this.get('y') % 4 ) {
                    case 0:
                        this.set('hexpartType', 1);
                        break;
                    case 2:
                        this.set('hexpartType', 2);
                        break;
                }
                break;

            case 1:
                switch ( this.get('y') % 4 ) {
                    case 1:
                        this.set('hexpartType', 4);
                        break;
                    case 3:
                        this.set('hexpartType', 3);
                        break;
                }
                break;

            case 2:
                switch ( this.get('y') % 4 ) {
                    case 0:
                        this.set('hexpartType', 2);
                        break;
                    case 2:
                        this.set('hexpartType', 1);
                        break;
                }
                break;

            case 3:
                switch ( this.get('y') % 4 ) {
                    case 1:
                        this.set('hexpartType', 3);
                        break;
                    case 3:
                        this.set('hexpartType', 4);
                        break;
                }
                break;

            default:
                this.set('hexpartType', 0);
        }
    },


    equals:function(hexpart)
    {
        var isEqual;
        isEqual = false;

        if ( this.x === hexpart.getX() && this.y === hexpart.getY() )
        {
            isEqual = true;
        }

        return isEqual;
    },

    getName:function()
    {
        return this.name;
    },

    getX:function()
    {
        return this.x;
    },

    getY:function() {

        return this.y;
    },

    getHexpartType:function()
    {
        return this.get('hexpartType');
    },

    getHexpartTypeName:function() {

        var hexpartTypeName = new Array("", "center", "lower", "lowerLeft", "lowerRight");

        return hexpartTypeName[this.hexpartType];
    }
});
