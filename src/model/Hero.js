import CObject from "@CObject";
import Enums from "@Enums";
import tool from "@Tool";

export default class Hero extends CObject {
    constructor(){
        super();
        this._type = Enums.types.hero;
        this._config = null;
        this._el = $("<div style='position: absolute;'></div>");

        this._currentScetion = -1;
    }

    move(){

    }

    hitTest(){

    }

    appendToParent(parent){
        this._el.css("width",this._size.w).css("height",this._size.h).attr("section",true);
        this._el.css("top",this._position.y + window._padding).css("left",this._position.x + window._padding);
        this._el.css("background-image","url("+this._bgImage+")");
        $(parent).append(this._el);
    }

    setToOriginPoint(){
        this._position = {x:window._padding,y:window._padding};
        this._el.css("top",this._position.y + window._padding).css("left",this._position.x + window._padding);
    }

    init(config){
        this._config = config;
        this._size = this._config.size;
        this._position = this._config.position;
        this._bgImage = this._config.img
    }

    checkSection(sections){
        
    }
}