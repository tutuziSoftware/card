(function(window){
    "use strict";

    if(window.nabiki === void 0){
        window.nabiki = {};
    }

    class HalfField{
        constructor(){
            this._hp = 20;
        }

        life(...plus){
            if(plus.length === 1) this._hp += plus[0];

            return this._hp;
        }
    };

    window.nabiki.HalfField = HalfField;
})(window);
