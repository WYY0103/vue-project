<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>

        <!-- stripe  隔行变色 -->
        <el-table :data="rightList" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column label="权限名称" prop="authName"></el-table-column>
				<el-table-column label="路径" prop="path"></el-table-column>
				<el-table-column label="权限等级">
					<!--  传参  模板插槽  获取当前此条数据来进行相应操作-->
					<template slot-scope="scope">
						<el-tag type="danger" v-if="scope.row.level==='0'">等级一</el-tag>
						<el-tag type="warning" v-if="scope.row.level==='1'">等级二</el-tag>
						<el-tag type="success" v-if="scope.row.level==='2'">等级三</el-tag>
					</template>
				</el-table-column>
			</el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        rightList:[]
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    async getRightList() {
        const {data:res} = await this.$http.get('rights/list');
        if(res.status == 200)  return this.$message.error('获取列表失败');
        this.rightList = res.data;
    },
  },
};
</script>


<style lang="less" scoped>
</style>