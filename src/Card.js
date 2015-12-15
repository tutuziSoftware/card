(function(window){
    "use strict";

    if(window.nabiki === void 0){
        window.nabiki = {};
    }

    class Card{
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
                "costs",
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
        }
    };

    window.nabiki.Card = Card;
})(window);
