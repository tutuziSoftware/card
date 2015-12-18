(function(window){
    "use strict";

    if(window.nabiki === void 0){
        window.nabiki = {};
    }

    class Hands extends Array{
        remove(index){
            if(index in this) this.splice(index, 1);
        }
    };

    window.nabiki.Hands = Hands;
})(window);
