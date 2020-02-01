
import CObstacle from "@CObstacle";
import Enums from "@Enums";

export default class Stone extends CObstacle {
    constructor(config){
        super(config);   
        
        this._subType = Enums.Obstacle.subType.stone;
    }
}