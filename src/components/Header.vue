<template>
  <div>
    <el-row type="flex" justify="space-between">
      <div class="arrows" @click="handleClick">
        <i class="el-icon-back"></i>
      </div>
      <div>admin 超级管理员 退出</div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods:{
    handleClick(){
      this.$emit("click")
    }
  }
};
</script>

<style>
.arrows {
  cursor: pointer;
}
</style>
