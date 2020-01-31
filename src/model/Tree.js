
import CObstacle from "@CObstacle";
import Enums from "@Enums";

export default class Tree extends CObstacle {
    constructor(config){
        super();   
        this._type = Enums.types.obstacle;
        this._subType = Enums.Obstacle.tree;
        this._config = config;
        this._el = $("<div style='position: absolute;border:1px solid red'></div>");
    }
}