import {v4 as uuidv4} from 'uuid';

// 随机生成一个游客身份  每次执行不能发生变化  持久存储
/*
    1 先检查一下本地存储是否有这个随机的id
    2 没有的话随机生成一个
    3 有的话直接获取继续使用
 */
export const getUUID = ()=>{
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    if(!uuid_token){
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}