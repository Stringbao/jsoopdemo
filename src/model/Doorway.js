
import Enums from "@Enums";

export default class Doorway{
    constructor(config){
        this._type = this._type = Enums.types.doorway;
        this._position = config.position;
        this._size = {w:50,h:50};
        this._el = $("<div style='position: absolute;border:1px solid #a431c1'></div>");
        this._bgImage = config.img;
        this._go = config.go;
    }

    appendToParent(parent){
        this._el.css("width",this._size.w).css("height",this._size.h);
        this._el.css("top",this._position.y + window._padding).css("left",this._position.x + window._padding);
        this._el.css("background-image","url("+this._bgImage+")");
        $(parent).append(this._el);
    }
}