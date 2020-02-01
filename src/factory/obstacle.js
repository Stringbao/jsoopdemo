
import Stone from "../obstacle/Stone.js";
import Tree from "../obstacle/Tree.js";
import Enums from "@Enums";

let ObstacleFactory = {
    outInstance(config){
        if(config.type == Enums.Obstacle.subType.tree){
            return new Tree(config);
        }
        if(config.type == Enums.Obstacle.subType.stone){
            return new Stone(config);
        }
    }
}

export default ObstacleFactory;