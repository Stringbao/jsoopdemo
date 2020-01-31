import CObject from "@CObject";
import Enums from "@Enums";

export default class Monster extends CObject {
    constructor(){
        super();

        this.range = {};
        this._type = Enums.types.monster;
    }

    move(){

    }

    hitTest(){

    }

    init(){
        
    }
}