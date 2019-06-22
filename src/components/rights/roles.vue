<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary">添加角色</el-button>
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column type="expand">
          <template v-slot="scope">
            <!-- <el-row
              v-for="(item, i) in scope.row.children"
              :key="item.id"
              class="bb"
              :class="i == 0 ? 'bt' : ''"
            >
              <el-col :span="6">
                <el-tag>{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="18" v-for="item1 in item.children" :key="item1.id">
                <el-row>
                  <el-col :span="6">
                    <el-tag type="success">{{ item1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18"></el-col>
                </el-row>
              </el-col>
            </el-row>-->
            <el-row
              v-for="(item1, i1) in scope.row.children"
              class="bb"
              :key="item1.id"
              :class="i1 == '0' ? 'bd' : ''"
            >
              <el-col :span="5">
                <el-tag closable>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                  :class="i2 == '0' ? '' : 'bd'"
                >
                  <el-col :span="6">
                    <el-tag closable type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                    >{{ item3.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="300px">
          <el-button type="primary" size="mini" class="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="mini" class="el-icon-delete">删除</el-button>
          <el-button type="warning" size="mini" class="el-icon-s-tools">分配权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: []
    };
  },

  methods: {
    async getRoleList() {
      const { data } = await this.$axios.get("roles");
      console.log(data);
      this.roleList = data.data;
    }
  },

  created() {
    this.getRoleList();
  }
};
</script>

<style lang='less' scoped>
.bd {
  border-top: 1px solid #eee;
}

.bb {
  border-bottom: 1px solid #eee;
}

.el-row {
  display: flex;
  align-items: center;
}

.el-tag {
  margin: 10px;
}
</style>
