export default class Section{
    constructor(){
        this._parent = null;

        this._index = -1;

        this._obstacles = [];
        this._monster = [];

        this._position = {x:0,y:0};

        this._size = {w:0,h:0};

        this._el = $("<div style='position: absolute;border:1px solid blue'></div>");
    }

    appendToParent(parent){
        this._el.css("width",this._size.w).css("height",this._size.h).attr("section",true);
        this._el.css("top",this._position.y + window._padding).css("left",this._position.x + window._padding);
        $(parent).append(this._el);
    }

    init(scene, idx, pos, size){
        this._index = idx;
        this._parent = scene;
        this._position = pos;
        this._size = size;
    }

    addObstacle(obstacle){
        this._obstacles.push(obstacle);
    }

    addMonster(monster){
        this._monster.push(monster)
    }
}