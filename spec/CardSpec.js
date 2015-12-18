describe("Card", ()=>{
    describe("クリーチャー", ()=>{
        var hanki = new nabiki.Card({
            "name":()=>"半機",
            "creature_type":()=>"機械",
            "flavor_text":()=>"彼の口は機械による利便性を説いた。しかし彼の無くした腕は痛みを訴えた。　ーーー機械神",
            "caption":()=>"アップキープ時、あなたは1点のライフを失う。アップキープ時、あなたはカードを1枚引く",
            "costs":[
                ["hanki_cost_id", (field, you_id)=>{
                    //fieldからマナを2つ取り除けるか確認する
                    //fieldからマナを2つ取り除く
                    //fieldに半機を出す
                }]
            ],
            "power":()=>2,
            "toughness":()=>2,
            "upkeep_step":(field, you_id, enemy_id)=>{
                //アップキープ時に、あなたは1点のライフを失う
                field[you_id].hp(-1);

                //アップキープ時に、あなたはカードを1枚引く
                field[you_id].hands.draw();
            }
        });

        it("半機", ()=>{
            expect(hanki.name()).toBe("半機");
            expect(hanki.creature_type()).toBe("機械");
            expect(hanki.flavor_text()).toBe("彼の口は機械による利便性を説いた。しかし彼の無くした腕は痛みを訴えた。　ーーー機械神");
            expect(hanki.caption()).toBe("アップキープ時、あなたは1点のライフを失う。アップキープ時、あなたはカードを1枚引く");
            expect(hanki.power()).toBe(2);
            expect(hanki.toughness()).toBe(2);
        });

        it("コスト関数の参照、追加、削除はMapで行う(オブジェクト指向的には悪い手だが、わざわざget,put,deleteを用意すべきなのかは今後考えるべきもの)", ()=>{
            expect(hanki.costs().size).toBe(1);
            expect(typeof hanki.costs().get("hanki_cost_id")).toBe("function");
        });
    });


    describe("手札",()=>{
        var hands = new nabiki.Hands;

        it("手札の追加",()=>{
            expect(hands.length).toBe(0);
            hands.push(new nabiki.Card({name:()=>"test"}));
            expect(hands.length).toBe(1);
            expect(hands[0].name()).toBe("test");
        });

        it("手札の削除");
    });


    describe("自分の場",()=>{
        var field = new nabiki.HalfField;

        it("ライフ", ()=>{
            expect(field.hp()).toBe(20);
            field.hp(-1);
            expect(field.hp()).toBe(19);
        });

        it("マナ");

        describe("場にカードを出す", ()=>{
            it("カードの指定");
            it("コストの支払い");
        });
    });


    describe("全体の場", ()=>{
        //Map？
        var field = new nabiki.Field;
        field.add("you_id", new nabiki.HalfField);
        field.add("enemy_id", new nabiki.HalfField);

        it("最初のドロー");
        it("先攻後攻判定(先攻後攻の乱数は引数で持つ)");
        it("");
    });
});
