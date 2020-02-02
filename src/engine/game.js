
import Hero from "../model/Hero.js";
import Scene from "../map/Scene.js";
import Enums from "@Enums";
import tool from "@Tool";

export default class Game{
    constructor(container, config){

        this._el = $(container);

        this._hero = new Hero();
        
        this._scenes = [];

        this._currentScenes = null;
        this._currentScenesConfig = null;
        
        this._config = config;
    }

    addScene(scene){
        this._scenes.push(scene);
    }

    goToScene(sid){
        this._currentScenes._status = Enums.Scene.disenabled;
        let scene = this.getSneneById(sid);
        scene.appendToParent(this._el);
        this._currentScenes = scene;
        this._currentScenes._status = Enums.Scene.enabled;

        this._hero.reloadHeroPosition(this._el);
        this._hero.setCurrentScene(scene);
    }
    
    init(){
        let that = this;
        //加载当前场景，异步加载其他场景的配置信息
        this._config.Scenes.forEach((x,idx) => {
            if(x.status == Enums.Scene.enabled){
                this._currentScenesConfig = x;
            }
        });
        this.asynLoadScenes();

        //初始化Hero
        if(this._currentScenes){
            this._hero.init(this._config.Hero);
            this._hero.appendToParent(this._el);
            this._hero.regMoveEvent(this._currentScenes);
        }

        tool.eventPublisher.on(Enums.doorway.enevtKey,(data)=>{
            that.goToScene(data.sid);
        })
    }

    asynLoadScenes(){
        if(this._currentScenesConfig){
            new Promise((resolve,reject)=>{
                let _scene = new Scene();
                _scene.init(this._currentScenesConfig);
                this.addScene(_scene);
                _scene.appendToParent(this._el);
                this._currentScenes = _scene;
                resolve();
            }).then(x=>{
                this._config.Scenes.forEach((x,idx) => {
                    if(x.status == Enums.Scene.disenabled){
                        let _scene = new Scene();
                        _scene.init(x);
                        this.addScene(_scene);
                    }
                });
            })
        }else{
            console.log("场景信息异常");
        }
    }

    getSneneById(id){
        let res = null;
        this._scenes.forEach(x=>{
            if(id == x._id){
                res = x;
            }
        })
        return res;
    }

    start(){

    }
}