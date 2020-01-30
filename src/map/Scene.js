
import Section from "./Section.js";
import Enums from "@Enums";

export default class Scene{
    constructor(){
        this._index = -1;

        this._config = null;

        this._sections = [];

        this._size = {w:0,h:0};

        /**
         * 0：未启用
         * 1：启用
         */
        this._status = Enums.Scene.disenabled;

        this._el = $("<div></div>");
    }

    appendToParent(parent){
        this._el.css("width",this._size.w).css("height",this._size.h).attr("scene",true);
        $(parent).html(this._el);
    }

    addSections(section){
        this._sections.push(section);
    }

    init(config,index){
        this._config = config;
        this._status = this._config.status;
        this._index = index;
        this._config.Sections.forEach((x,idx) => {
            let section = new Section();
            let pos = x.position;
            let size = x.size;
            section.init(this, idx, pos, size);
            section.appendToParent(this._el);

            this.addSections(section);
        });
    }
}