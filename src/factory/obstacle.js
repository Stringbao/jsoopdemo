
import Stone from "../model/Stone.js";
import Tree from "../model/Tree.js";
import Enums from "@Enums";

let ObstacleFactory = {
    outInstance(config){
        if(config.type == Enums.Obstacle.tree){
            return new Tree(config);
        }
        if(config.type == Enums.Obstacle.stone){
            return new Stone(config);
        }
    }
}

export default ObstacleFactory;