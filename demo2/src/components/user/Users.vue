<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!-- 
            通过el-row进行布局
            分成不同的el-col  每个el-col按照span的份数进行占位          
            gutter  两个格子隔开的距离   
        -->
      <el-row :gutter="20">
        <!-- 文本搜索框 -->
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>

        <!-- 按钮-->
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格 -->
      <!-- :data  数据源  label  表头  prop 通过这个读取接口中数据项-->
      <el-table :data="userList" border>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <!-- 模板插槽   读取当前这条数据传递过来  固定写法-->
          <template slot-scope="scope">
            <!-- v-model  双向数据绑定  true和false的地方 -->
            <!-- change事件   状态改变触发函数  参数为当前那条数据 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="UserDelete(scope.row.id)"
            ></el-button>
            <!-- el-tooltip 给用户添加提示文字 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配权限"
              placement="top-start"
            >
              <!-- 用户权限 -->
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 
          size-change 页面条数改变 
          current-change  页码改变  从一个页跳转到另一个页
          current-page  当前页
          page-size  当前页的条数
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加对话框板块  addDialogVisible  代表是否显示对话框-->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%">
      <span>
        <el-form :rules="addFormRules" :model="addForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框板块 -->
    <el-dialog
      title="用户修改信息"
      :visible.sync="editDialogVisible"
      width="30%"
    >
      <span>
        <el-form label-width="80px" :model="editForm" :rules="editFormRules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightDialogVisible"
      width="30%"
    >
      <span>
        <div>
          <p>当前的用户：{{ userinfo.username }}</p>
          <p>当前的角色：{{ userinfo.role_name }}</p>
          <p>
            分配新角色：
            <!-- selectRoleId 用于记录你最终选择了那个选项 -->
            <el-select v-model="selectRoleId" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </p>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      //   接收接口返回的数据渲染到页面上
      userList: [],
      //   总数据
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //   验证规则
      addFormRules: {
        username: [
          {
            required: true,
            message: "请输入登录名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在3到5个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "长度在3到5个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机",
            trigger: "blur",
          },
        ],
      },
      editDialogVisible: false,
      editForm: {
        username: "",
        email: "",
        mobile: "",
      },
      editFormRules: {
        username: [
          {
            required: true,
            message: "请输入登录名称",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在3到5个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机",
            trigger: "blur",
          },
        ],
      },
      setRightDialogVisible: false,
      // 用于接收接口返回的角色列表信息
      roleList: [],
      userinfo: {},
      selectRoleId: '',
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //写 表格数据的时候  优先去先取数据 然后再渲染到页面上
    async getUserList() {
      // 向接口发送请求  获取数据
      // await和async二者一起使用  缺一不可
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      this.userList = res.data.users;
      //   total记录接口中的数据
      this.total = res.data.total;
    },
    // 改变用户状态
    async userStateChanged(row) {
      // 需要  在地址当中拼接参数的时候  需要  ${}
      // 重点  不是单引号  是反引号才能解析变量
      const { data: res } = await this.$http.put(
        `users/${row.id}/state/${row.mg_state}`
      );
      if (res.meta.status != 200) this.$message.error("设置状态失败");
      this.$message.success("设置状态成功");
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    async addUser() {
      const { data: res } = await this.$http.post("users", this.addForm);
      if (res.meta.status !== 201) return this.$message.error("添加用户失败");
      this.$message.success("添加用户成功");
      // 必须要关闭对话框
      this.addDialogVisible = false;
      // 需要重新请求列表数据  才能把新添加的数据绑定到列表中
      this.getUserList();
      // 将添加的数据清除
      this.addForm.username = "";
      this.addForm.password = "";
      this.addForm.email = "";
      this.addForm.mobile = "";
    },
    async UserDelete(id) {
      const { data: res } = await this.$http.delete(`users/${id}`);
      if (res.meta.status !== 200) return this.$message.error("删除用户失败");
      this.$message.success("删除用户成功");
      this.getUserList();
    },
    //
    async showEditDialog(id) {
      this.editDialogVisible = true;
      // 通过id查询单条数据
      const { data: res } = await this.$http.get(`users/${id}`);
      this.editForm = res.data;
    },
    // 修改用户
    async EditUserInfo() {
      const { data: res } = await this.$http.put(`users/${this.editForm.id}`, {
        email: this.editForm.email,
        mobile: this.editForm.mobile,
      });
      if (res.meta.status !== 200) return this.$message.error("修改用户失败");
      this.$message.success("修改用户成功");
      this.editDialogVisible = false;
      this.getUserList();
    },
    async setRole(row) {
      const { data: res } = await this.$http.get("roles");
      this.roleList = res.data;
      this.userinfo = row;
      this.setRightDialogVisible = true;
    },
    async saveRoleInfo() {
      // 安全验证，若用户没有选择则提示用户
      if (!this.selectRoleId) return this.$message.error("请选择分配的角色");
      const { data: res } = await this.$http.put(`users/${this.userinfo.id}/role`, {rid: this.selectRoleId,});
      if (res.meta.status !== 200) return this.$message.error("修改角色失败");
      this.$message.success("修改角色成功");
      this.getUserList();
      this.setRightDialogVisible = false;
    },
  },
};
</script>


<style>
</style>