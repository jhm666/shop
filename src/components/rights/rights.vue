<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="rightList" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50px"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template v-slot="scope">
            <el-tag v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level == 1">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightList: []
    };
  },

  methods: {
    async getRightList() {
      const { data } = await this.$axios.get("rights/" + "list");
      this.rightList = data.data;
    }
  },

  created() {
    this.getRightList();
  }
};
</script>

<style lang='less' scoped>
</style>
