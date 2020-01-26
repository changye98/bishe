<template>
  <div>
    <a-popover  trigger="hover">
      <template slot="content" >
        <a-icon type="setting" />
        <router-link to="/account/setting" style="color: black">账号设置</router-link>
        <a-divider type="horizontal" />
        <p>
          <a-icon type="reload" />
          <span>退出登录</span>
        </p>
      </template>

      <a-button style="background: rgba(118,238,0,0.1);border: transparent">
          <a-avatar :src="userAvatar" size="large" style="margin: 0px 10px"/>
        <!--<a-avatar   icon="user" style="margin: 0px 10px"/>-->
        <span>
          {{username}}
        </span>
      </a-button>
    </a-popover>
  </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  data(){
    return {
       username:"" ,
      userAvatar:""
    }
  },
  methods: {
    ...mapActions(['Logout']), // 清除token和localStorage中的信息
    ...mapGetters(['nickname', 'avatar']), // 从全局变量中获取用户昵称和头像
    handleLogout () {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that.Logout({}).then(() => {
            window.location.reload()
          }).catch(err => {
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  },
  created(){
    this.username = localStorage.getItem("userNickname")
    this.userAvatar=localStorage.getItem("userAvatar")
  }
}
</script>
