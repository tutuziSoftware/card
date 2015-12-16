(function(window){
    "use strict";

    if(window.nabiki === void 0){
        window.nabiki = {};
    }

    class Card{
        static _s(){
            /*
             複数の状態があり得るデータ。
             配列で入る。
             環境によってコストの支払い方法が変動する場合、関数の第一引数を使う。
             環境によってコストの支払い方法が追加された場合、Cardクラスは支払い方法の追加/削除の方法を提供する(現時点でのベターな選択)。
             */
            return [
                //---カード固有、外的要因で変化する---
                "costs",
            ];
        }

        constructor(data){
            /*
             全てのデータは関数として扱う。
             環境によって値が変動する場合、関数の第一引数を使う。
             */
            [
                //---カード固有、外的要因で変化する---
                "name",
                "creature_type",
                "flavor_text",
                "caption",
                "card_type",
                "creature_type",
                "power",
                "toughness",

                //---ステップ系---
                "untap_step",
                "upkeep_step",
                "draw_step",
                "main_step1",
                "battle_step",
                "main_step2",
                "end_step",

                //---do系---
                //そのカードを使用した時
                "do_cast",
                //場に出た時
                "do_enter_field",
                //場を離れた時
                "do_leave_field",

                //---効果---
                "effects"
            ].forEach((key) => {
                if(typeof data[key] === "function") this[key] = data[key];
            });

            Card._s().forEach((key)=>{
                if(Array.isArray(data[key])) this["_"+key] = new Map(data[key]);
            });
        }

        costs(){
            //迂闊な！
            return this["_costs"];
        };
    };

    window.nabiki.Card = Card;
})(window);
