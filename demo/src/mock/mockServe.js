// 引入mockjs
// JSON文件无需对外暴露 直接引入即可
import Mock from 'mockjs';
import banner from './banner.json';
import floor from './floor.json';

// mock数据  参数：请求的地址  请求数据  
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });

