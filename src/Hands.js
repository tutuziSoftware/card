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
            this.data.push(card);
        }

        count(fetch){
            fetch(this.data.length);
        }

        get(index){
            return new Promise((resolve, reject)=>{
                if(this.data[index] !== void 0){
                    resolve(this.data[index]);
                }else{
                    reject();
                }
            });
        }
    };

    window.nabiki.Hands = Hands;
})(window);
