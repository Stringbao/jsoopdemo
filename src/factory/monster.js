

import Monster from "../model/Monster.js";
import Enums from "@Enums";

let MonsterFactory = {
    outInstance(config){
        if(config.type == Enums.Monster.car){
            return new Monster(config);
        }
        if(config.type == Enums.Monster.glass){
            return new Monster(config);
        }
    }
}

export default MonsterFactory;