<template>
  <div>
    <a-popover  trigger="hover">
      <template slot="content" >
        <a-icon type="setting" />
        <router-link to="/account/settring" style="color: black">账号设置</router-link>
        <a-divider type="horizontal" />
        <p>
          <a-icon type="reload" />
          <span>退出登录</span>
        </p>
      </template>

      <a-button style="background: rgba(118,238,0,0.1);border: transparent">
        <a-avatar   icon="user" style="margin: 0px 10px"/>
        <span>
          用户名
        </span>
      </a-button>
    </a-popover>
  </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
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
  }
}
</script>
