
import Hero from "../model/Hero.js";
import Scene from "../map/Scene.js";
import Enums from "@Enums";

export default class Game{
    constructor(container, config){

        this._el = $(container);

        this._hero = new Hero();
        
        this._scenes = [];

        this._currentScenes = null;
        this._currentScenesConfig = {config:null,idx:-1};
        
        this._config = config;
    }

    addScene(scene){
        this._scenes.push(scene);
    }

    goNextScene(){
        let idx = this._currentScenes._index;
        if(idx == this._scenes.length-1){
            return;
        }
        let nextScene = this._scenes[idx+1];
        nextScene.appendToParent(this._el);
        this._currentScenes = nextScene;
        this._hero.setToOriginPoint();
    }

    goPrevScene(){
        let idx = this._currentScenes._index;
        if(idx == 0){
            return;
        }
        let prevScene = this._scenes[idx-1];
        prevScene.appendToParent(this._el);
        this._currentScenes = prevScene;
        this._hero.setToOriginPoint();
    }
    
    init(){
        //加载当前场景，异步加载其他场景的配置信息
        this._config.Scenes.forEach((x,idx) => {
            if(x.status == Enums.Scene.enabled){
                this._currentScenesConfig = {config:x,idx:idx};
            }
        });
        this.asynLoadScenes();

        //初始化Hero
        if(this._currentScenes){
            this._hero.init(this._config.Hero);
            this._hero.appendToParent(this._el);
        }
    }

    asynLoadScenes(){
        if(this._currentScenesConfig.config){
            new Promise((resolve,reject)=>{
                let _scene = new Scene();
                _scene.init(this._currentScenesConfig.config,this._currentScenesConfig.idx);
                this.addScene(_scene);
                _scene.appendToParent(this._el);
                this._currentScenes = _scene;
                resolve();
            }).then(x=>{
                this._config.Scenes.forEach((x,idx) => {
                    if(x.status == Enums.Scene.disenabled){
                        let _scene = new Scene();
                        _scene.init(x, idx);
                        this.addScene(_scene);
                    }
                });
            })
        }else{
            console.log("场景信息异常");
        }
    }

    start(){

    }
}