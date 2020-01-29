import CObject from "@CObject";

export default class Hero extends CObject {
    constructor(){
        super();
        this._type = 1;
        this._config = null;
        this._el = $("<div style='position: absolute;border:1px solid blue'></div>");
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

    setRelativePosition(idx){
        this._relativePosition = idx;
    }

    init(config){
        this._config = config;
        this._size = this._config.size;
        this._position = this._config.position;
        this._bgImage = this._config.img
    }
}