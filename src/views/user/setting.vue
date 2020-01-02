<template>
    <div class="home"  >
        <a-menu
                style="width: 256px;height: 100%;border: 1px solid black"
                mode="inline"
                :theme="theme"
                @click="handleClick"
        >
            <a-menu-item key="1"  class="menu_item" >
                <router-link to="/account/setting/base_setting">
                    <a-icon type="mail" />
                    基本设置
                </router-link>
            </a-menu-item>
            <a-menu-item key="2"  class="menu_item" >

                    <router-link to="/account/setting/personalize">
                        <a-icon type="calendar" />
                        个性化
                    </router-link>
            </a-menu-item>
            <router-view style="float: right"></router-view>

        </a-menu>
        <h3>ssss</h3>

    </div>
</template>

<script>
    export default {
        name: "baseSettring",
        data(){
            return{
                theme: 'light',
            }
        },
        methods: {
            handleClick (e) {
                console.log('click ', e)
                this.current = e.key
            },
            changeTheme (checked) {
                this.theme = checked ? 'dark' : 'light'
            },
        },
    }
</script>

<style scoped>
    .home{
        width: 1300px;
        height: 500px;
        margin: 50px auto;
        text-align: center;
        border: 2px solid red;
    }
     .ant-card-wider-padding>>>.ant-card-body{
        height: 100%;
    }
    .menu_item{
        text-align: left;
    }
</style>