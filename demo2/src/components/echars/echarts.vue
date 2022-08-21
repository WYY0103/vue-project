<template>
  <div id="myChart" :style="{ width: '100%', height: '100%' }"></div>

  <!-- 
      使用echarts的步骤
        安装               npm install echarts --save
        main.js引入        import echarts from 'echarts'
        模板中设置一个div   用于装图表的容器
        在组件当中         单独引入echarts内部文件（固定写法）
        在mounted中        获取列表信息
        在methods中        声明函数，绘制图表（获取数据，初始化我的echarts，绘制图表）
  
   -->
</template>




<script>
    // 引入基本模板
    let echarts = require("echarts/lib/echarts");
    // 引入柱状图组件
    require("echarts/lib/chart/bar");
    // 引入提示框和title组件
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/title");
    export default {
    // 生命周期  需要用mounted 挂载后的生命周期，挂载后，可以获取到html结构层
    mounted() {
        this.drawLine();
    },
    methods: {
        async drawLine() {
        //获取数据
        const { data: res } = await this.$http.get("reports/type/1");
        //初始化echarts
        let myChart = echarts.init(document.getElementById("myChart"));
        // 绘制图表
        // res.data 相当于 案例当中的option  就是要绘制的图表信息
        myChart.setOption(res.data);
        },
    },
};
</script>

<style>
</style>
