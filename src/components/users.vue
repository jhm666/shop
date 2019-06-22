<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never">
      <el-input style="width: 350px; margin-right:20px" placeholder="请输入内容" v-model="page.query">
        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
      </el-input>
      <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template v-slot="item">
            <el-switch v-model="item.row.mg_state" @change="changeState(item.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template v-slot="scope">
            <el-button
              size="mini"
              class="el-icon-edit"
              type="primary"
              @click="editUsersDailog(scope.row)"
            ></el-button>
            <el-button size="mini" class="el-icon-delete" type="danger" @click="removeUsers(scope.row.id)"></el-button>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button size="mini" class="el-icon-s-tools" type="warning"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pagenum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="page.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话库 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible" width="50%" @close="resetFieldsAddform">
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUsers">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="EditDialogVisible"
      width="50%"
      @close="resetFieldsEditForm"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUsers(editForm.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    const emailvalid = (rule, value, callback) => {
      const ref = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (!ref.test(value)) {
        return callback(new Error("邮箱格式不正确"));
      }
      callback();
    };
    const mobilevalid = (rule, value, callback) => {
      const ref1 = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!ref1.test(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      callback();
    };
    return {
      userList: [],
      page: {
        query:'',
        pagenum: 1,
        pagesize: 2
      },
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editForm: {},
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: emailvalid, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入正确的手机号码", trigger: "blur" },
          { validator: mobilevalid, trigger: "blur" }
        ]
      },
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: emailvalid, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入正确的手机号码", trigger: "blur" },
          { validator: mobilevalid, trigger: "blur" }
        ]
      },
      total: 0,
      addFormVisible: false,
      EditDialogVisible: false
    };
  },

  methods: {
    async getUserList() {
      const { data } = await this.$axios.get("users", { params: this.page });
      this.total = data.data.total;
      this.userList = data.data.users;
    },
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.page.pagenum = val;
      this.getUserList();
    },
    async changeState(row) {
      const { data } = await this.$axios.put(
        `users/${row.id}/state/${row.mg_state}`
      );
      if (data.meta.status != 200) return;
      this.$msg.success("设置状态成功");
    },
    resetFieldsAddform() {
      this.$refs.addFormRef.resetFields();
    },
    resetFieldsEditForm() {
      this.$refs.editFormRef.resetFields();
    },
    addUsers() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$msg.error("用户添加失败");
        const { data } = await this.$axios.post("users", this.addForm);
        if (data.meta.status != 201) return;
        this.getUserList();
        this.addFormVisible = false;
        this.$msg.success("添加用户成功");
      });
    },
    editUsersDailog(row) {
      this.EditDialogVisible = true;
      this.editForm = row;
    },
    editUsers(id) {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        const { data } = await this.$axios.put("users/" + id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        });
        if (data.meta.status != 200) return;
        this.getUserList();
        this.EditDialogVisible = false;
        this.$msg.success("修改成功");
      });
    },
    async removeUsers(id) {
      const result = await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err)
      if(result != 'confirm') return this.$msg.info('已取消删除操作')
      const { data } = await this.$axios.delete('users/' + id)
      this.getUserList()
      this.$msg.success('删除用户成功')
    }
  },

  created() {
    this.getUserList();
  }
};
</script>

<style lang='less' scoped>
.el-table {
  margin-top: 20px;
  font-size: 12px;
  margin-bottom: 20px;
}
</style>
