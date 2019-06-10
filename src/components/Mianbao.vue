<template>
    <div class="bread">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in info" :key="index"> <!-- 循环data中info的数据，item书循环的每个meta数据 -->
            {{item}}
        </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info:[]
        }
    },
    watch:{
        $route(){
           this.getRote()
            
        }
    },
    methods:{
        //将监视的方法封装
        getRote(){
            const arr = this.$route.matched;//  将获取$route的matched的全部数据储存到arr中
            var info = []; //储存的空数组
            for (var i=0;i<arr.length;i++){
                info.push(arr[i].meta)
            }
            // console.dir(arr.indexOf)
            // arr.forEach((v)=>{
            //      info.push(v.meta)
            // })
            this.info = info;//将循环提取出来的值赋值到data中的info中
        }
    },
    mounted(){
        this.getRote()  //页面刷新后就获取，页面刷新后不获面包屑值不显示
    }
}
</script>

<style>
.bread{
    padding-bottom: 10px;
    border-bottom: 1px #ccc solid
}
</style>
