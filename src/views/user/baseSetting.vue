<template>
    <div class="account-settings-info-view">
        <a-row :gutter="16">
            <a-col :md="24" :lg="16">

                <a-form layout="vertical">
                    <a-form-item
                            label="昵称"
                    >
                        <a-input placeholder="给自己起个名字" v-model="nickname" />
                    </a-form-item>
                    <a-form-item
                            label="description"
                    >
                        <a-textarea rows="4" placeholder="You are not alone." v-model="description"/>
                    </a-form-item>

                    <a-form-item
                            label="电子邮件"
                            :required="false"
                    >
                        <a-input placeholder="exp@admin.com" v-model="email"/>
                    </a-form-item>
                    <!--<a-form-item
                            label="登录密码"
                            :required="false"
                    >
                        <a-input placeholder="密码"/>
                    </a-form-item>-->

                    <a-form-item>
                        <a-button type="primary" @click="handleOk">提交</a-button>
                    </a-form-item>
                </a-form>

            </a-col>
            <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
                <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
                    <a-icon type="cloud-upload-o" class="upload-icon"/>
                    <div class="mask">
                        <a-icon type="plus" />
                    </div>
                    <img :src="userAvatar"/>
                </div>
            </a-col>

        </a-row>

    </div>
</template>

<script>
  import  {getAction} from "@/http";
  export default {

    data () {
      return {
        userAvatar:"",
        nickname:"",
        description:"",
        email:"",

      }
    },
    methods: {
      handleOk(){
        getAction("/user/update/"+localStorage.getItem("userId"),{nickname:this.nickname,description:this.description,email:this.email}).then((res)=>{
          if(res.data.success===true){
            localStorage.setItem("userNickname",res.data.result.userNickname);
            this.$router.push("/home/index")
          }else{
            this.$notification['error']({
              message: '信息修改失败',
              description: res.data.message,
            });

          }
        })
      }
    },
    created(){
      this.userAvatar=localStorage.getItem("userAvatar");
      getAction("/user/edit/"+localStorage.getItem("userId")).then((res)=>{
        if(res.data.success===true){
          console.log(res.data.result.userNickname)
          this.nickname=res.data.result.userNickname
          this.description=res.data.result.userDescription
          this.email=res.data.result.userEmail
        }else{
          this.$notification['error']({
            message: '信息获取失败',
            description: res.data.message,
          });

        }
      })
    }
  }
</script>

<style lang="less" scoped>

    .avatar-upload-wrapper {
        height: 200px;
        width: 100%;
    }

    .ant-upload-preview {
        position: relative;
        margin: 0 auto;
        width: 100%;
        max-width: 180px;
        border-radius: 50%;
        box-shadow: 0 0 4px #ccc;

        .upload-icon {
            position: absolute;
            top: 0;
            right: 10px;
            font-size: 1.4rem;
            padding: 0.5rem;
            background: rgba(222, 221, 221, 0.7);
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.2);
        }
        .mask {
            opacity: 0;
            position: absolute;
            background: rgba(0,0,0,0.4);
            cursor: pointer;
            transition: opacity 0.4s;

            &:hover {
                opacity: 1;
            }

            i {
                font-size: 2rem;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -1rem;
                margin-top: -1rem;
                color: #d6d6d6;
            }
        }

        img, .mask {
            width: 100%;
            max-width: 180px;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
        }
    }
</style>
