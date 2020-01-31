import CObject from "@CObject";

export default class CObstacle extends CObject{
    init(){
        this._position = this._config.position;
        this._size = this._config.size;
    }

    appendToParent(parent){
        this._el.css("width",this._size.w).css("height",this._size.h).attr("stone",true);
        this._el.css("top",this._position.y + window._padding).css("left",this._position.x + window._padding);
        $(parent).append(this._el);
    }
}