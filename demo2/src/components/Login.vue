<template>
  <div class="login_container" id="app">
      <div class="login_box">
          <!-- 头像区域 -->
          <div class="avatar_box">
              <img src="../assets/logo.png" alt="">
          </div>

          
          <!-- element-ui本身就是写页面的一个库 elememnt-ui中定义图标库prefix-icon-->
          <!-- ref  代表当前表单的对象 -->
          <el-form label-width="0px" class="login_form" :rules="LoginFormRules" :model="LoginForm" ref="LoginFormRef">
            <el-form-item prop="username">
                <el-input v-model="LoginForm.username" prefix-icon="iconfont icon-user" placeholder="用户名:"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="LoginForm.password" prefix-icon="iconfont icon-3702mima"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>


      </div>

      

  </div>
</template>


<script>


    export default{
        data(){
            return {
                LoginForm:{
                    username:'',
                    password:''
                },
                // 验证规则  与prop连用
                LoginFormRules:{
                    username:[
						 { required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password:[
						 { required: true, message: '请输入密码', trigger: 'blur' }
					]
                }
            }
            
        },
        methods:{
            // 表单重置需要和验证规则一起使用   
            resetLoginForm(){
                // this指向整个组件   this.$refs指向整个表单对象
                // console.log(this);
                // resetFields   elemene-ui下面的表单重置函数
                this.$refs.LoginFormRef.resetFields();
            },
            async login(){
                /*
                    1 挂载axios
                    2 把axios挂载到vue原型上  
                */
                // a是一个promise对象   需要简化成JSON对象(通过await  和 async来简化)
                // 但是其中只有data是需要的，所以要通过解构赋值来获取data
               const {data:res} = await this.$http.post('login',this.LoginForm);
               if(res.meta.status!==200)  return this.$message.error('登陆失败');
               this.$message.success('登陆成功');

                // 地址跳转
                // 存储令牌token  防止恶意攻击
                window.sessionStorage.setItem('token',res.data.token);
                //通过  $router.push 进行跳转
                this.$router.push('/home');
				


            }
        }
    }


</script>


<!-- 第三方图标库-->



<!-- lang 代表我写的样式 是less语法的样式  scoped 这个必须要写 代表该样式只在当前vue组件生效 -->

<style lang="less" scoped>
    .login_container {
    background-color: #2b4b6b;
    height: 100%;
    }
    .login_box {
    background-color: #ffffff;
    width: 450px;
    height: 300px;
    border-radius: 3px;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    }
    .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #eee;
    padding: 10px;

    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;
        
    }

    .btns{
        // float: right;
        display: flex;
        justify-content: flex-end;
    }
</style>>

