
export default {
    point:{
        getCenterPoint(pos,size){
            return {x:pos.x + parseFloat(size.w/2),y:pos.y + parseFloat(size.h/2)};
        },
        checkCenterPointInSections(centerPoint,sections){
            return new Promise((resolve,reject)=>{
                let res = null;
                sections.forEach(section=>{
                    if(this.checkCenterPointInOther(centerPoint,section)){
                        res = section;
                    }
                })
                if(res){
                    resolve(res);
                }else{
                    reject();
                }
            })
        },
        checkCenterPointInOther(centerPoint, item){
            let res = false;
            let _pos = item._position;
            let _size = item._size;
            if(centerPoint.x > _pos.x && centerPoint.y > _pos.y && centerPoint.x < _pos.x + _size.w && centerPoint.y < _pos.y + _size.h){
                res = true;
            }
            return res;
        }
    },
    idBuilder:{
        id:10000,
        newId(){
            return this.id++;
        }
    },
    checkItemExist(item,data){
        let res = false;
        data.forEach(x=>{
            if(item._id == x._id){
                res = true;
            }
        })
        return res;
    }
}