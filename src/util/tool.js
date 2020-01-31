
export default {
    point:{
        checkCenterPointInSections(centerPoint,sections){
            return new Promise((resolve,reject)=>{
                let res = null;
                sections.forEach(section=>{
                    let _pos = section._position;
                    let _size = section._size;
                    if(centerPoint.x > _pos.x && centerPoint.y > _pos.y && centerPoint.x < _pos.x + _size.w && centerPoint.y < _pos.y + _size.h){
                        res = section;
                    }
                })
                if(res){
                    resolve(res);
                }else{
                    reject();
                }
            })
        }
    }
}