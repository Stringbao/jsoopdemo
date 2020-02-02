
import CObject from "@CObject";
import Enums from "@Enums";
import tool from "@Tool";

export default class CMonster extends CObject{

    constructor(config){
        super();
        this._type = Enums.types.monster;
        this._config = config;
        this._id = tool.idBuilder.newId();
        this._el = $("<div _id='"+this._id+"' style='position: absolute;border:1px solid blue'></div>");
    }

    init(){
        this._position = this._config.position;
        this._size = this._config.size;
        this._bgImage = this._config.img;
    }

    appendToParent(parent){
        this._el.css("width",this._size.w).css("height",this._size.h);
        this._el.css("top",this._position.y + window._padding).css("left",this._position.x + window._padding);
        this._el.css("background-image","url("+this._bgImage+")");
        $(parent).append(this._el);
    }
}