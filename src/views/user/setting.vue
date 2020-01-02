<template>
    <div class="home"  >
        <a-menu  mode="horizontal" class="clearfix menu" >
            <a-menu-item class="left" style="padding: 0px"><img src="~assets/img/logo.png" width="500px"> </a-menu-item>
            <a-menu-item class="daohanglan" style="padding: 0px"><router-link to="/home/index"><a-icon type="home" />首页</router-link> </a-menu-item>
            <a-menu-item class="daohanglan" style="padding: 0px"> <router-link to="/home/myGrade"><a-icon type="user" />我的成绩</router-link></a-menu-item>
            <a-menu-item class="daohanglan" style="padding: 0px"> <router-link to="/home/question"><a-icon type="question-circle" />题目管理</router-link></a-menu-item>
            <a-menu-item class="daohanglan" style="padding: 0px"><router-link to="/home/test_paper"><a-icon type="edit" />试卷管理</router-link> </a-menu-item>
            <a-menu-item class="daohanglan" style="padding: 0px"><router-link to="/home/exam"><a-icon type="highlight" />考试列表</router-link> </a-menu-item>

        </a-menu>
        <user-menu id="user_menu"></user-menu>
        <router-view></router-view>

    </div>
</template>

<script>
    export default {
        name: "baseSettring"
    }
</script>

<style scoped>

</style>