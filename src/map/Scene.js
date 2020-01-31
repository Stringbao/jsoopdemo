
import Section from "./Section.js";
import Enums from "@Enums";
import obstacleFactory from "../factory/obstacle.js";
import monsterFactory from "../factory/monster.js"; 
import tool from "@Tool";

export default class Scene{
    constructor(){
        this._index = -1;

        //服务端初始化的配置信息
        this._config = null;

        this._sections = [];

        this._size = {w:0,h:0};
        this._position = {x:0,y:0};

        /**
         * 0：未启用
         * 1：启用
         */
        this._status = Enums.Scene.disenabled;

        this._el = $("<div></div>");

        //当前怪物和障碍物
        this._monsters = [];
        this._obstacles = [];
    }

    appendToParent(parent){
        this._el.css("width",this._size.w).css("height",this._size.h).attr("scene",true);
        $(parent).html(this._el);
    }

    addSections(section){
        this._sections.push(section);
    }

    //均分为4块
    splitSections(){
        let halfWidth = this._size.w/2;
        let halfHeight = this._size.h/2;
        let res = [
            {
                position:{x:0,y:0},
                size:{w:halfWidth,h:halfHeight},
            },
            {
                position:{x:halfWidth,y:0},
                size:{w:halfWidth,h:halfHeight},
            },
            {
                position:{x:0,y:halfHeight},
                size:{w:halfWidth,h:halfHeight},
            },
            {
                position:{x:halfWidth,y:halfHeight},
                size:{w:halfWidth,h:halfHeight},
            }
        ];
        return res;
    }

    init(config,index){
        this._config = config;
        this._size = {w:this._config.width,h:this._config.height};
        this._status = this._config.status;
        this._index = index;
        this.initScetions();
        this.initObstacles();
        this.initMonsters();

        //障碍物和怪物分组到各个Scetion里面
        this.groupItemsInSection(this._obstacles);
        this.groupItemsInSection(this._monsters);
    }

    initMonsters(){
        this._config.Monsters.forEach(x=>{
            let _instance = monsterFactory.outInstance(x);
            _instance.init();
            _instance.appendToParent(this._el);
            this._monsters.push(_instance);
        })
    }

    initObstacles(){
        this._config.Obstacles.forEach(x=>{
            let _instance = obstacleFactory.outInstance(x);
            _instance.init();
            _instance.appendToParent(this._el);
            this._obstacles.push(_instance);
            
        })
    }

    initScetions(){
        this.splitSections().forEach((x,idx) => {
            let section = new Section();
            let pos = x.position;
            let size = x.size;
            section.init(this, idx, pos, size);
            section.appendToParent(this._el);

            this.addSections(section);
        });
    }

    groupItemsInSection(data){
        if(data.length >0){
            let _type = data[0]._type;
            this._obstacles.forEach(item=>{
                let _pos = item._position;
                let _size = item._size;
                let centerPoint = {x:_pos.x + parseFloat(_size.w/2),y:_pos.y + parseFloat(_size.h/2)};

                tool.point.checkCenterPointInSections(centerPoint,this._sections).then(section=>{
                    if(_type == Enums.types.obstacle){
                        section.addObstacle(item);
                    }
                    if(_type == Enums.types.monster){
                        section.addMonster(item);
                    }
                })
            })
        }
    }
}