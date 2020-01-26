<template>
  <div class="home"  >
    <a-menu  mode="horizontal" class="clearfix menu" >
      <a-menu-item class="left" style="padding: 0px"><img src="~assets/img/logo.png" width="500px"> </a-menu-item>
      <a-menu-item class="daohanglan" style="padding: 0px"><router-link to="/home/index"><a-icon type="home" />首页</router-link> </a-menu-item>
      <a-menu-item class="daohanglan" style="padding: 0px"> <router-link to="/home/myGrade"><a-icon type="user" />我的成绩</router-link></a-menu-item>
      <a-menu-item class="daohanglan" style="padding: 0px"> <router-link to="/home/question"><a-icon type="question-circle" />题目管理</router-link></a-menu-item>
      <a-menu-item class="daohanglan" style="padding: 0px"><router-link to="/home/test_paper"><a-icon type="edit" />试卷管理</router-link> </a-menu-item>
      <a-menu-item class="daohanglan" style="margin-right: 70px"><router-link to="/home/exam"><a-icon type="highlight" />考试列表</router-link> </a-menu-item>

    </a-menu>
    <user-menu id="user_menu" style="float: right"></user-menu>

    <router-view></router-view>

  </div>
</template>

<script>

import userMenu from "@/views/user/UserMenu.vue"

export default {
  name: 'home',
  components: {

    userMenu
  },
  data() {
    return {

    };
  },
  methods: {
  },
  created(){
    let hour = new Date().getHours() ;
    let time = null;
    if(hour>=0&&hour<=6){
      time= "深夜好,"
    }
    if(hour>=6&&hour<=9){
      time= "早上好,"
    }
    if(hour>=9&&hour<=12){
      time= "中午好,"
    }
    if(hour>=12&&hour<=18){
      time= "下午好,"
    }
    if(hour>=18&&hour<=24){
      time= "晚上好,"
    }
    this.$notification['success']({
      message: '欢迎！',
      description: time + '  欢迎回来  ' +localStorage.getItem("userNickname")
    });
  }

}
</script>
<style scoped>
  .daohanglan{
    float: left;
    margin: 0px 40px;
    padding: 0px;
  }
  .menu{

    box-sizing: border-box;
    background: rgba(118,238,0,0.8);
  }
  .home{
    position: relative;
    height: 950px;
    background: rgba(240,242 ,243,0.8);
  }
  #user_menu{
    position:absolute;
    right: 100px;
    margin-top: -40px;
  }


</style>
