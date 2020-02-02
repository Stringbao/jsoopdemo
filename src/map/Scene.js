
import Section from "./Section.js";
import Enums from "@Enums";
import obstacleFactory from "../factory/obstacle.js";
import monsterFactory from "../factory/monster.js"; 
import tool from "@Tool";
import Doorway from "../model/Doorway.js";

export default class Scene{
    constructor(){
        //服务端初始化的配置信息
        this._config = null;

        this._id = -1;

        this._sections = [];

        this._size = {w:0,h:0};
        this._position = {x:0,y:0};

        this._doorway = null;

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

    init(config){
        this._config = config;
        this._id = this._config.id;
        this._size = {w:this._config.width,h:this._config.height};
        this._status = this._config.status;
        this.initScetions();
        this.initObstacles();
        this.initMonsters();
        this.initDoorway();

        //障碍物和怪物分组到各个Scetion里面
        this.groupItemsInSection(this._obstacles);
        this.groupItemsInSection(this._monsters);

        //边界障碍物和怪物的section情况处理
        this.groupBoundaryInSection(this._obstacles);
        this.groupBoundaryInSection(this._monsters);
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

    initDoorway(){
        if(this._config.doorway){
            let doorway = new Doorway(this._config.doorway);
            doorway.appendToParent(this._el);
            this._doorway = doorway;
        }
    }

    initScetions(){
        this._sections = [];
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
            let _arr = _type == Enums.types.obstacle?this._obstacles:this._monsters;
            _arr.forEach(item=>{
                let centerPoint = tool.point.getCenterPoint(item._position,item._size)
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

    /**
     * @description 边界交集的Obstacle和Monster
     * centerPoint不在当前section的，但是部分x和y坐标有重叠的情况
     */
    groupBoundaryInSection(data){
        if(data.length >0){
            let _type = data[0]._type;
            let _arr = _type == Enums.types.obstacle?this._obstacles:this._monsters;
            _arr.forEach(item=>{
                let _pos = item._position;
                let _size = item._size;
                let centerPoint = tool.point.getCenterPoint(_pos, _size);
                this._sections.forEach(section=>{
                    let _sec_pos = section._position;
                    let _sec_size = section._size;
                    let isIn = tool.point.checkCenterPointInOther(centerPoint, section);
                    if(!isIn){
                        if(
                            //top位置
                            _pos.y + _size.h == _sec_pos.y && _pos.x > _sec_pos.x && _pos.x + _size.w < _sec_pos.x + _sec_size.w ||
                            //left位置
                            _pos.x + _size.w == _sec_pos.x && _pos.y > _sec_pos.y && _pos.y + _size.h < _sec_pos.y + _sec_size.h ||
                            //down位置
                            _pos.y == _sec_pos.y + _sec_size.h && _pos.x > _sec_pos.x && _pos.x + _size.w < _sec_pos.x + _sec_size.w ||
                            //right位置
                            _pos.x == _sec_pos.x + _sec_size.w && _pos.y > _sec_pos.y && _pos.y + _size.h < _sec_pos.y + _sec_size.h
                        ){
                            if(_type == Enums.types.obstacle){
                                section.addObstacle(item);
                            }
                            if(_type == Enums.types.monster){
                                section.addMonster(item);
                            }
                        }
                    }
                })
            })
        }
    }
}