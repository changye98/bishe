<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a @click="tiaozhuan">tiaozhuan</a>
  </div>
</template>
<script>
   import  {getAction} from "@/http";
  export  default  {
    components:{
    },
    methods:{
      tiaozhuan(){
        getAction("/test/admin/listTest",{fx:6666}).then((res)=>{
          console.log(res)
        })
      }
    }
  }
</script>
<style>
  body{
    background: white;
    height: 100%;
    width: 100%;
    background-size: cover;
  }
</style>
