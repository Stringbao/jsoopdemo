import CObject from "@CObject";
import Enums from "@Enums";
import tool from "@Tool";

export default class Hero extends CObject {
    constructor(){
        super();
        this._type = Enums.types.hero;
        this._config = null;
        this._el = $("<div style='position: absolute;'></div>");

        this._moveSize = Enums.hero.moveSize;

        this._currentSection = null;

        this._currentScene = null;

        /**
         * @description 行走的方向
         * "top":38,
         * "down":40,
         * "left":37,
         * "right":39,
         */
        this._direction = -1;

        /**
         * @description 当前hero的状态
         * "ready":0,
         * "move":1,
         * "fight":2
         */
        this._status = Enums.hero.status.ready;
    }

    /**
     * @description 边界检测
     */
    boundaryCheck(){
        let res = {flag:true,newPos:null,direction:-1};
        let scene = this._currentSection._parent;
        switch(this._direction){
            case Enums.hero.direction.top:
                if(this._position.y == scene._position.y){
                    res.flag = false;
                }
                else{
                    res.flag = true;
                    res.newPos = {x:this._position.x, y:this._position.y - this._moveSize};
                    res.direction = Enums.hero.direction.top;
                }
                break;
            case Enums.hero.direction.down:
                if((this._position.y + this._size.h) == (scene._position.y + scene._size.h)){
                    res.flag = false;
                }
                else{
                    res.flag = true;
                    res.newPos = {x:this._position.x,y:this._position.y + this._moveSize};
                    res.direction = Enums.hero.direction.down;
                }
                break;
            case Enums.hero.direction.left:
                if(this._position.x == scene._position.x){
                    res.flag = false;
                }
                else{
                    res.flag = true;
                    res.newPos = {x:this._position.x - this._moveSize, y:this._position.y};
                    res.direction = Enums.hero.direction.left;
                }
                break;
            case Enums.hero.direction.right:
                if((this._position.x + this._size.w) == (scene._position.x + scene._size.w)){
                    res.flag = false;
                }
                else{
                    res.flag = true;
                    res.newPos = {x:this._position.x + this._moveSize, y:this._position.y};
                    res.direction = Enums.hero.direction.right;
                }
                break;
        }
        return res;
    }

    move(){
        if(this._status != Enums.hero.status.ready){
            return;
        }
        this._status = Enums.hero.status.move;
        this.checkSection(this._currentScene._sections).then(x=>{
            this._currentSection = x;
            let boundaryCheckResult = this.boundaryCheck();
            if(boundaryCheckResult.flag){
                let tmpCenterPoint =  tool.point.getCenterPoint(boundaryCheckResult.newPos,this._size);
                //Section 障碍物碰撞检测
                if(this.hitObstaclesTest(tmpCenterPoint)){
                    this._position = boundaryCheckResult.newPos;
                    this.updatePos();
                    this.checkDoorway();
                    //更新_currentSection
                    this.checkSection(this._currentScene._sections).then(next=>{
                        this._currentSection = next;
                        console.log("current section idx is " + this._currentSection._index);
                    })
                }
            }
            this._status = Enums.hero.status.ready;
        }).catch(error=>{
            debugger
        })
    }
    
    checkDoorway(){
        let centerPoint = tool.point.getCenterPoint(this._position,this._size);
        if(tool.point.checkCenterPointInOther(centerPoint,this._currentScene._doorway)){
            tool.eventPublisher.broadcast(Enums.doorway.enevtKey,{sid:this._currentScene._doorway._go});
        }
    }

    hitObstaclesTest(centerPoint){
        let res = true;
        this._currentSection._obstacles.forEach(x => {
            if(tool.point.checkCenterPointInOther(centerPoint, x)){
                res = false;
            }
        });
        // this._currentSection._monsters.forEach(x => {
        //     if(tool.point.checkCenterPointInOther(centerPoint, x)){
        //         res = false;
        //     }
        // });
        return res;
    }

    updatePos(){
        this._el.css("top",this._position.y + window._padding).css("left",this._position.x + window._padding);
    }
    updateSize(){
        this._el.css("width",this._size.w).css("height",this._size.h).attr("section",true);
        this._el.css("background-image","url("+this._bgImage+")");
    }

    appendToParent(parent){
        this.updatePos();
        this.updateSize();
        $(parent).append(this._el);
    }

    reloadHeroPosition(parent){
        this._position = {x:0,y:0};
        this.appendToParent(parent);
    }

    setCurrentScene(scene){
        this._currentScene = scene;
    }

    init(config){
        this._config = config;
        this._size = this._config.size;
        this._position = this._config.position;
        this._bgImage = this._config.img;
    }

    checkSection(sections){
        let centerPoint = tool.point.getCenterPoint(this._position,this._size);
        return tool.point.checkCenterPointInSections(centerPoint,sections);
    }

    regMoveEvent(scene){
        this.setCurrentScene(scene);
        $(document).on("keydown",(e)=>{
            if(e.keyCode == Enums.hero.direction.top || e.keyCode == Enums.hero.direction.down || 
                e.keyCode == Enums.hero.direction.left || e.keyCode == Enums.hero.direction.right){
                    this._direction = e.keyCode;
                    this.move();
                }
            
        })
    }
}