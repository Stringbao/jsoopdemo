

import Person from "../monster/Person.js";
import Devil from "../monster/Devil.js";
import Enums from "@Enums";

let MonsterFactory = {
    outInstance(config){
        if(config.type == Enums.Monster.subType.devil){
            return new Devil(config);
        }
        if(config.type == Enums.Monster.subType.person){
            return new Person(config);
        }
    }
}

export default MonsterFactory;