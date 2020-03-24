<template>
    <div class="banner-wrapper">
        <div class="banner-title-wrapper">
            <div class="title-line-wrapper" style="opacity: 1; transform: translate(0px, 0px);">
                <div style="transform: translateX(-64px);"></div>
            </div>
            <h1 style="opacity: 1; transform: translate(0px, 0px);">Online Exam</h1>
            <p style="opacity: 1; transform: translate(0px, 0px);">
                <span>基于SpringBoot+Vue技术栈开发的在线考试系统</span>
            </p>
        </div>
        <div class="banner-image-wrapper" style="opacity: 1;">
            <a-carousel arrows autoplay>
                <div v-for="i in 4" :key="i">
                    <img :src="`/home/cover${i}.png`" style="height: 500px"/>
                </div>
            </a-carousel>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
    .banner-image-wrapper {
        width: 80%;
        height: 500px;
        position: absolute;
        right: -5%;
        top: 200px;
        bottom: 0;
    }
    .title-line-wrapper {
        width: 312px;
        margin: 24px auto 76px;
    }
    .banner-title-wrapper{
        width: 40%;
        max-width: 480px;
        height: 245px;
        position: absolute;
        top: -400px;
        bottom: 0;
        left: 3%;
        margin: auto;
    }


</style>