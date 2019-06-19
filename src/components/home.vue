<template>
  <div>
     <el-button type="info" @click="exit">退出</el-button>
  </div>
</template>

<script>
export default {

  data () {
    return {
    }
  },

  methods: {
    exit(){
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  },

  created () {
  }
}
</script>

<style lang='less' scoped>

</style>
