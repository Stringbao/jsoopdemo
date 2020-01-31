
import CObstacle from "@CObstacle";
import Enums from "@Enums";

export default class Stone extends CObstacle {
    constructor(config){
        super();   
        this._type = Enums.types.obstacle;
        this._subType = Enums.Obstacle.stone;
        this._config = config;
        this._el = $("<div style='position: absolute;border:1px solid yellow'></div>");
    }
}