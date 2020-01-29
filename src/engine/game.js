
import Hero from "../model/Hero.js";
import Scene from "../map/Scene.js";

export default class Game{
    constructor(container, config){

        this._el = $(container);

        this._hero = new Hero();
        
        this._scenes = [];

        this._currentScenes = null;

        this._config = config;
    }

    addScene(scene){
        this._scenes.push(scene);
    }

    goNextScene(){
        
    }

    getCurrentScene(){
        let scene = null;
        this._scenes.forEach(x=>{
            if(x._status == 1){
                scene = x;
            }
        })
        this._currentScenes = scene;
    }
    
    init(){
        //初始化所有地图场景
        this._config.Scenes.forEach((x,idx) => {
            let _scene = new Scene();
            _scene.init(x,idx);
            _scene.appendToParent(this._el);
            this.addScene(_scene);
        });

        //初始化Hero
        this._hero.init(this._config.Hero);
        this._hero.appendToParent(this._el);

        //获取当前的地图场景索引
        this.getCurrentScene();
        this._hero.setRelativePosition(this._currentScenes._index);
        debugger
    }

    start(){

    }
}