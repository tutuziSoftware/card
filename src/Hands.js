(function(window){
    "use strict";

    if(window.nabiki === void 0){
        window.nabiki = {};
    }

    class Hands{
        constructor(data){
            if(this.data !== void 0 && this.data instanceof "Array"){
                this.data = data;
            }else{
                this.data = [];
            }
        }

        push(card){
            if(this.data.length == 10) return;

            this.data.push(card);
        }

        get count(){
            return Promise.resolve(this.data.length);
        }

        get(index){
            if(this.data[index] !== void 0){
                return Promise.resolve(this.data[index]);
            }else{
                return Promise.reject();
            }
        }

        remove(index){
            if(this.data[index] !== void 0){
                this.data.splice(index, 1);
                return Promise.resolve();
            }else{
                return Promise.reject();
            }
        }
    };

    window.nabiki.Hands = Hands;
})(window);
