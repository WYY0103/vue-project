<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 添加角色单独一行   所以用布局来做 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 列表区域 -->
      <el-table :data="rolelist" border stripe>
          <!-- 下拉板 expand-->
        <el-table-column type="expand">

            <template slot-scope="scope">

                <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['bdbottom',i1===0?'bdtop':'','vcenter']">
                    <!-- 第一级  边框采用动态属性   若为第一级则加入属性-->
                    <el-col :span="5">
                        <el-tag closable>{{item1.authName}}</el-tag>
						<i class="el-icon-caret-right"></i>
                    </el-col> 
                    <!-- 第二级和第三级 -->
                    <el-col :span="19">
                       <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="[i2===0?'':'bdtop','vcenter']">
                           <!-- 第二级 -->
                           <el-col :span="6">
                               <el-tag type="success" closable>{{item2.authName}}</el-tag>
							   <i class="el-icon-caret-right"></i>
                           </el-col>
                           <!-- 第三级 -->
                           <el-col :span="18">
                               <el-tag type="warning" closable v-for="(item3,i3) in item2.children" :key="item3.id" @close="removeRightById(scope.row,item3.id)">{{item3.authName}}</el-tag>

                           </el-col>
                       </el-row>

                    </el-col>

                </el-row>
            </template>


        </el-table-column>
        
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <!-- 按钮  需要将当前数据的某些信息作为参数传递  用模板插槽来获取当前数据 -->
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="RoleDelete(scope.row.id)" >删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="30%">
      <span>
        <el-form ref="addFormRef" :rules="addFormRules" :model="addForm" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="addForm.roleName" prop="roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="addForm.roleDesc" prop="roleDesc"></el-input>
          </el-form-item>
        </el-form>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改对话框 -->
    <el-dialog title="修改角色信息" :visible.sync="editDialogVisible" width="30%">
      <span>
          <el-form :model="editForm" label-width="80px">
			  	<el-form-item label="角色名称">
			  		<el-input v-model="editForm.roleName"></el-input>
			  	</el-form-item>
			  	<el-form-item label="角色描述">
			  		<el-input v-model="editForm.roleDesc"></el-input>
			  	</el-form-item>
		  </el-form>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditRolesInfo">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="30%">
      <span>
          <!-- 
            props  需要读取的配置项 
            default-expand-all 所有选项展开 
            default-checked-keys 获取已经选择的
          -->
          <el-tree :data="rightsList" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef" :props="treePorps">
			
			    </el-tree>

      </span>


      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>

    
  </div>
</template>


<script>
export default {
  data() {
    return {
      addDialogVisible: false,
      rolelist: [],
      addFormRules: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
        ],
        roleDesc: [
          {
            required: true,
            message: "请输入角色描述",
            trigger: "blur",
          },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      addForm: {
        roleName: "",
        roleDesc: "",
      },
      editDialogVisible:false,
      editForm:{},
      setRightDialogVisible:false,
      rightsList :[],
      treePorps:{
          // label  显示的文字部分  
          label:'authName',
          // children  从哪读取
          children:'children'
      },
      defKeys:[],
      roleid:'',
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) return this.$message.error("获取列表数据失败");
      this.rolelist = res.data;
    },
    async addUser() {
      const { data: res } = await this.$http.post("roles", this.addForm);
      if (res.meta.status != 201) return this.$message.error("添加角色失败");
      this.$message.success("添加角色成功");
      this.getRoleList();
      this.addDialogVisible = false;
    },
    async showEditDialog(id) {
        const {data:res} = await this.$http.get(`roles/${id}`);
        if(res.meta.status !== 200) return this.$message.error('获取失败');
        this.editForm = res.data;
        this.editDialogVisible = true;
    },
    async EditRolesInfo(){
        const {data:res} = await this.$http.put(`roles/${this.editForm.roleId}`,{roleName:this.editForm.roleName,roleDesc:this.editForm.roleDesc});
        if(res.meta.status !==200)  return this.$message.error('修改失败');
        this.$message.success('修改成功');
        this.getRoleList();
        this.editDialogVisible = false;
    },
    async RoleDelete(id){
        const {data:res} = await this.$http.delete(`roles/${id}`);
        if(res.meta.status !==200) return this.$message.error('删除失败');
        this.$message.success('删除成功');
        this.getRoleList();
    },
    async showSetRightDialog(row){
        // 将角色id保存  用于下面的请求
        this.roleid = row.id;
        const {data:res} = await this.$http.get('rights/tree');
				if(res.meta.status!==200) return this.$message.error('获取失败');
        // this.$message.success('获取成功');
				this.rightsList = res.data;
        // 调用递归函数显示用户已有的权限
				this.getLeafKeys(row,this.defKeys);
				this.setRightDialogVisible=true;
    },
    // 通过递归调用获取到最底层选项
    getLeafKeys(node,arr){
				// 如果没有children属性  那么肯定是最底层选项
				if(!node.children){
					return arr.push(node.id);
				}
				//如果是第一级  和第二级的选项  那么调用自身  往下继续找
				node.children.forEach(item=>this.getLeafKeys(item,arr));
			},
    async removeRightById(row,rightid){
        const {data:res } = await this.$http.delete(`roles/${row.id}/rights/${rightid}`);
        if(res.meta.status!==200) return this.$message.error('删除权限失败');
	    this.$message.success('删除权限成功');
        // 不用刷新列表  将请求后的数据赋值给当前数据即可
        row.children = res.data;
    },
    async allotRights(){
      // getCheckedKeys   返回目前被选中的节点的 key 所组成的数组
      // getHalfCheckedKeys   返回目前半选中的节点所组成的数组	
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ];
      const idStr = keys.join(',');
      const {data:res} = await this.$http.post(`roles/${this.roleid}/rights`,{rids:idStr});
      if(res.meta.status!==200) return this.$message.error('更新权限失败');
      this.$message.success('更新权限成功');
      this.getRoleList();
      this.setRightDialogVisible = false;
    }
  },
};
</script>

<style lang="less" scoped>

    .el-tag {
		margin: 7px;
	}
	
	.bdtop {
		border-top: 1px solid #eee;
	}
	
	.bdbottom {
		border-bottom: 1px solid #eee;
	}
	
	.vcenter {
		display: flex;
		align-items: center;
	}



</style>