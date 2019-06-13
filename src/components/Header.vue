<template>
  <div>
    <el-row type="flex" justify="space-between">
      <div class="arrows" @click="handleClick"> <!-- 注册点击事件 -->
        <i class="el-icon-back"></i>
      </div>
      <div class="asd">{{user.uname}} {{user.realname}} <span @click="handleLoginOut" class="logOut">退出</span></div>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{
      user:{}
    }
  },
  methods:{
    handleClick(){
      //获取时间名click
      this.$emit("click")
    },
    handleLoginOut(){
      this.$axios({
        url:"http://localhost:8899/admin/account/logout",
        method:"GET",
        withCredentials: true
      }).then(res=>{
        const  {status,message}=res.data;
        if(status===0){
          this.$message(message);
          this.$router.push("/login");
          localStorage.removeItem("user")
        }
      })
    }
  },
  mounted(){
    this.user=this.$store.state.user
    // console.log(this.user)
  }
};
</script>

<style>
.arrows,.logOut ,.asd{
  cursor: pointer;
}
</style>
