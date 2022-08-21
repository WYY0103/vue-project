<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
        <el-row>
			<el-col>
				<el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
			</el-col>
		</el-row>


        <!-- tree-table  需要用columns来进行配置 -->
        <tree-table :columns="cateColumns" :data="cateList" :expand-type="false" :selection-type="false" :show-index="true" 
            :show-row-hover="true"  border class="tree-table" element-loading-text="拼命加载中" index-text="#">

            <!-- 是否有效 使用树形插件时若用模板插槽 注意slot中的值要与data中绑定的一致-->
            <template slot="isOk" slot-scope="scope">
				  <i v-if="scope.row.cat_deleted === false" class="el-icon-success" style="color: lightgreen"></i>
				  <i v-else class="el-icon-error" style="color: red"></i>
			</template>

            <!-- 排序 -->
            <template slot="order" slot-scope="scope">
				<el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
				<el-tag v-else-if="scope.row.cat_level === 1" size="mini" type="success">二级</el-tag>
				<el-tag v-else size="mini" type="warning">三级</el-tag>
			</template>


            <!-- 操作 -->
            <template slot="opt" slot-scope="scope">
                <el-button icon="el-icon-edit" size="mini" type="primary" @click="showEditDialog(scope.row.cat_id)">编辑</el-button>
				<el-button icon="el-icon-delete" size="mini" type="danger" @click="removeCateById(scope.row.cat_id)">删除</el-button>

            </template>




        </tree-table>


        <el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="queryInfo.pagenum"
			:page-sizes="[10, 20, 30, 40]"
			:page-size="queryInfo.pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>


    </el-card>



    <!-- 编辑对话框 -->
    <el-dialog title="修改信息" :visible.sync="editCateDialogVisible" width="30%">
        <span>
            <el-form ref="editCateFormRef" :model="editCateForm" label-width="100px">
			    <el-form-item label="分类名称:">
			      <el-input v-model="editCateForm.cat_name"></el-input>
			    </el-form-item>
			  </el-form>

        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editCateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editCate">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 添加对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="30%">
        <span>
            <el-form ref="addCateFormRef" :model="addCateForm" label-width="100px">
			    <el-form-item label="分类名称: " prop="cat_name">
			      <el-input v-model="addCateForm.cat_name"></el-input>
			    </el-form-item>

			    <el-form-item label="父级分类: ">
			      <!-- 
                      options 用来指定数据源
			          cascadeProps 用来指定配置对象
                      selectedKeys  选中的级联选择框
			      -->
			      <el-cascader v-model="selectedKeys"
			        :change-on-select="true"
			        :options="parentCateList"
			        :props="cascadeProps"
			        clearable
			        @change="parentCateChanged"></el-cascader>
			    </el-form-item>
			  </el-form>

        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addCateDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCateDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>



  </div>
</template>


<script>
export default {
  data() {
    return {
        queryInfo: {
		    type: 3,
			pagenum: 1,
			pagesize: 5
		},
        cateList :[],
        total:0,
        cateColumns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          // 表示, 将当前列定义为模板列
          type: "template",
          // 表示当前列使用模板名称
          template: "isOk",
        },
        {
          label: "排序",
          // 表示, 将当前列定义为模板列
          type: "template",
          // 表示当前列使用模板名称
          template: "order",
        },
        {
          label: "操作",
          // 表示, 将当前列定义为模板列
          type: "template",
          // 表示当前列使用模板名称
          template: "opt",
        },
      ],
      editCateDialogVisible:false,
      editCateForm:{},
      addCateDialogVisible:false,
      addCateForm:{
        // 将要添加的分类的名称
		cat_name: '',
		// 父级分类的Id
		cat_pid: 0,
		// 分类的等级, 默认要添加的是一级分类
		cat_level: 0
      },
      // 用于接收一加载时级联选择框中所有的数据（数据源）
      parentCateList:[],
      // 接收选中的级联选择框
      selectedKeys:[],
      cascadeProps: {
		value: 'cat_id',
		label: 'cat_name',
		children: 'children',
		// 从el-cascader标签的属性,中移动到这个cascadeProps中
		expandTrigger: 'hover'
      },



    };
  },
  created() {
      this.getCateList();
  },
  methods: {
      async getCateList(){
          const {data : res} = await this.$http.get('categories',{params:this.queryInfo});
          if(res.meta.status!==200) return this.$message.error('请求列表失败');
          this.cateList = res.data.result;
          this.total = res.data.total;
      },
      showAddCateDialog(){
          // 点击添加按钮时需要请求级联选择框的数据
          this.getParentCateList();
          this.addCateDialogVisible = true;

      },
      async getParentCateList(){
          const {data:res} = await this.$http.get('categories',{params:{type:2}});
		  this.parentCateList = res.data
      },
      async removeCateById(cat_id){
          const {data:res} = await this.$http.delete(`categories/${cat_id}`);
          if(res.meta.status!==200) return this.$message.error('删除失败');
          this.$message.success('删除成功');
          this.getCateList();
      },
      handleSizeChange(newSize){
          this.queryInfo.pagesize = newSize;
          this.getCateList();
      },
      handleCurrentChange(newPage){
          this.queryInfo.pagenum = newPage;
          this.getCateList();
      },
      async showEditDialog(cat_id){
          const {data:res} = await this.$http.get(`categories/${cat_id}`);
          if(res.meta.status!==200) return this.$message.error('获取数据失败');
          this.editCateForm = res.data;
          this.editCateDialogVisible = true;

      },
      async editCate(){
          const {data:res} = await this.$http.put(`categories/${this.editCateForm.cat_id}`,{cat_name:this.editCateForm.cat_name});
          if(res.meta.status!==200)  return this.$message.error('修改信息失败');
          this.$message.success('修改信息成功');
          this.getCateList();
          this.editCateDialogVisible = false;
      },
      parentCateChanged(){
          

      }
  },
};
</script>


<style lang="less" scoped>
</style>