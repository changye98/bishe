<template>
  <div class="main">
    <div class="top clearfix">
      <img src="~assets/logo.png" style="height: 44px;vertical-align: top;margin-right: 16px;border-style: none"/>
      <h1 style="display: inline" >Online Exam</h1>
      <h2 style="margin-top: 20px;">基于SpringBoot+Vue实现的在线考试系统</h2>
    </div>
    <a-form
            class="loginForm"
            :form="form"
    >
      <a-tabs
              :activeKey="customActiveKey"
              :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
      >
        <a-tab-pane key="tab1" tab="在线考试系统登录">
          <a-form-item>
              <a-input
                      size="large"
                      type="text"
                      placeholder="请输入帐户名"
                      v-decorator="[ 'username',
           {
            rules: [
             {
                required: true,
                message: '账号不能为空'
              },
              {
                validator: this.handleUsernameOrPassword,
                message: ' 长度应不小于6位',
              },
            ],
            validateTrigger: 'blur'
          },
        ]"
              >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
                    size="large"
                    type="password"
                    autocomplete="false"
                    placeholder="请输入密码"
                    v-decorator="[
                'password',
                {rules: [{ required: true, message: '密码不能为空' },
                {
                validator: this.handleUsernameOrPassword,
                message: ' 长度应不小于6位',
              },], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>

          </a-form-item>
            <router-link class="right" to="/register" style="float: right;position: relative;margin-left: 100px">注册账户</router-link>
        </a-tab-pane>
      </a-tabs>


      <a-form-item style="margin-top:-5px">
        <a-button type="primary" html-type="submit" @click="handleOk" >
          登录
        </a-button>

      </a-form-item>
    </a-form>
  </div>
</template>

<script>
    import  {getAction} from "@/http";
    export default {
        components: {
        },
        data () {
            return {
              visible:false,
              model:{},
              customActiveKey: 'tab1',
              form: this.$form.createForm(this),
              url:{
                  login:'/login/dengLuXianZhi'
                },
            }
        },
        created () {
          console.log(this.username = localStorage.getItem("userNickname"))
        },
        methods: {
            handleUsernameOrPassword (rule, value, callback) {
                //const { state } = this
                const regex = /[a-zA-Z0-9]{6,}/
                if (regex.test(value)) {
                    callback()
                } else {
                    callback('长度应不小于6位')
                }
            },
            handleOk(){
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let formData = Object.assign(this.model, values);
                        formData['username']=this.form.getFieldValue('username');
                        formData['password']=this.form.getFieldValue('password') ;
                        getAction(this.url.login,formData).then((res)=>{
                          if(res.data.success===true){
                            localStorage.setItem("userId",res.data.result.userId);
                            localStorage.setItem("userNickname",res.data.result.userNickname);
                            localStorage.setItem("userRoleId",res.data.result.userRoleId);
                            localStorage.setItem("userAvatar",res.data.result.userAvatar);

                            this.$router.push("/home/index")
                          }else{
                            this.$notification['error']({
                              message: '登陆失败',
                              description: res.data.message,
                            });

                          }
                        })

                    }
                })

            },
          closeModal(e) {
            this.visible = false
          },
        }
    }
</script>

<style >
  .main{
    border: 1px solid transparent;
    background:  url(../../assets/background.jpg) no-repeat 50%;
    height: 925px;
    width: 100%;
    background-size: cover;
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }
  .top{
    width: 400px;
    text-align: center;
    margin: 150px auto;
  }
  .loginForm{
    width: 368px;
    font-size: 14px;
    line-height: 1.5;
    color:rgba(0,0,0,0.65);
    box-sizing: border-box;
    margin: -125px auto;
    padding: 0;
    list-style: none;

  }
  label {
    font-size: 14px;
  }
  .ant-form-item-control-wrapper .ant-form-explain{
      /*position: relative;top: -38px !important;*/
  }



</style>
