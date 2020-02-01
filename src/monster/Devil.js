import CMonster from "@CMonster";
import Enums from "@Enums";

export default class Devil extends CMonster {
    constructor(config){
        super(config);

        this.range = {};
        this._subType = Enums.Monster.subType.devil;

        /**
         * @description 怪物的状态
         * 0:live
         * 1:move
         * 2:fight
         * 3:dead
         */
        this._status = -1;
    }

    init(){
        
    }
}