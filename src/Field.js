(function(window){
    "use strict";

    if(window.nabiki === void 0){
        window.nabiki = {};
    }

    class Field{
        constructor(data){
            if(this.data !== void 0 && this.data instanceof "Array"){
                this.data = data;
            }else{
                this.data = [];
            }
        }

        add(index, card){
            if(this.isPlay == false) return false;

            this.data.splice(index, 0, card);
        }

        get count(){
            return Promise.resolve(this.data.length);
        }

        get isPlay(){
            return this.data.length != 6;
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

    window.nabiki.Field = Field;
})(window);
