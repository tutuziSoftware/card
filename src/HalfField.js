(function(window){
    "use strict";

    if(window.nabiki === void 0){
        window.nabiki = {};
    }

    class HalfField{
        constructor(hands){
            this._hp = 20;
            this._mana = 0;
            this._hands = hands;
        }

        life(...plus){
            if(plus.length === 1) this._hp += plus[0];

            return this._hp;
        }

        mana(...plus){
            if(plus.length === 1) this._mana += plus[0];

            return this._mana;
        }

        get hands(){
            return this._hands;
        }
    };

    window.nabiki.HalfField = HalfField;
})(window);
