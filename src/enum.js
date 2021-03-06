

export default {
    Scene:{
        enabled:"1",
        disenabled:"0"
    },
    types:{
        hero:1,
        obstacle:2,
        monster:3,
        doorway:4
    },
    Obstacle:{
        subType:{
            tree:"1",
            stone:"2"
        }
    },
    Monster:{
        subType:{
            devil:"1",
            person:"2"
        },
        status:{
            live:0,
            move:1,
            fight:2,
            dead:3
        }
    },
    hero:{
        moveSize:50,
        direction:{
            "top":38,
            "down":40,
            "left":37,
            "right":39,
        },
        status:{
            "ready":0,
            "move":1,
            "fight":2
        }
    },
    doorway:{
        enevtKey:"Doorway"
    }
}