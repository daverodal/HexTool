export default Ember.Object.create({
    x:false,
    y:false,
    refHexpartX:false,
    refHexpartY:false,
    hexpartType:false,
    name:false,
    prefix:false,

    hexpartInit:function(name){
// Hexpart(name)
        if ( Hexpart.arguments.length == 1 )
        {
            this.name = Hexpart.arguments[0];
            this.calculateHexpart();
        }

// Hexpart(x,y)
        if ( Hexpart.arguments.length == 2 )
        {
            this.x = Hexpart.arguments[0];
            this.y = Hexpart.arguments[1];

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

    setXYwithNameAndType:function( hexagonName, hexpartType )
    {
        var hexagon = new Hexagon(hexagonName);

        this.x = hexagon.getX();
        this.y = hexagon.getY();

        switch ( hexpartType ) {

            case HEXAGON_CENTER:

                break;

            case BOTTOM_HEXSIDE:

                this.y = this.y + 2;
                break;

            case LOWER_LEFT_HEXSIDE:

                this.x = this.x - 1;
                this.y = this.y + 1;
                break;

            case UPPER_LEFT_HEXSIDE:

                this.x = this.x - 1;
                this.y = this.y - 1;
                break;
        }
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

    calculateHexpartName:function() {

        var name;

        // center = 1, lower = 2, lower left = 3, upper left = 4

        switch ( this.hexpartType ) {

            case 1:
                this.refHexpartX = this.x;
                this.refHexpartY = this.y;
                this.prefix = "hexpart:";
                break;

            case 2:
                this.refHexpartX = this.x;
                this.refHexpartY = this.y - 2;
                this.prefix = "hexpart_";
                break;

            case 3:
                this.refHexpartX = this.x + 1;
                this.refHexpartY = this.y - 1;
                this.prefix = "hexpart\\";
                break;

            case 4:
                this.refHexpartX = this.x + 1;
                this.refHexpartY = this.y + 1;
                this.prefix = "hexpart/";
                break;
        }

        if ( this.hexpartType > 0 ) {

            var refHexagon = new Hexagon();

            refHexagon.setXY(this.refHexpartX, this.refHexpartY);
            this.name = this.prefix + refHexagon.getName();

        } else {

            this.hexpartName = "null";
        }
    },

    calculateHexpart:function()
    {
        // center = :, lower = _, lower left = \\, upper left = /
        //    since \ is a javascript escape char, need to check for \\

        var hexagon = new Hexagon();
        hexagon.setNumber(this.name.substr(8,4));

        var hexpartTypeLetter = this.name.charAt(7);

        this.refHexpartX = hexagon.getX();
        this.refHexpartY = hexagon.getY();

        switch ( hexpartTypeLetter ) {

            case ':':

                this.hexpartType = 1;
                this.x = this.refHexpartX;
                this.y = this.refHexpartY;
                break;

            case '_':

                this.hexpartType = 2;
                this.x = this.refHexpartX;
                this.y = this.refHexpartY + 2;
                break;

            case '\\':

                this.hexpartType = 3;
                this.x = this.refHexpartX - 1;
                this.y = this.refHexpartY + 1;
                break;

            case '/':

                this.hexpartType = 4;
                this.x = this.refHexpartX - 1;
                this.y = this.refHexpartY - 1;
                break;

            default:

                this.hexpartType = 1;
                this.x = this.refHexpartX;
                this.y = this.refHexpartY;
                break;
        }
    },

    equals:function(hexpart)
    {
        var isEqual;
        isEqual = false;

        if ( this.x == hexpart.getX() && this.y == hexpart.getY() )
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
