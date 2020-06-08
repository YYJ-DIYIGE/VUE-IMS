<template>
  <div class="container">
    <section v-if="!lock">
      <el-button type="primary" size="medium" round @click="newUser"
        >新建用户</el-button
      >
      <el-dialog :title="formTitle" :visible.sync="formBoxShow">
        <el-form :model="form">
          <el-form-item
            class="widther"
            label="成员名称"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            class="widther"
            label="账号"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            class="widther"
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="formBoxShow = false">取 消</el-button>
          <el-button type="primary" @click="handleSave">确 定</el-button>
        </div>
      </el-dialog>
      <div class="table-container" style="width: 100%">
        <el-table :data="userData" style="width: 100%">
          <el-table-column prop="id" label="id" style="width: 180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" style="width: 180">
          </el-table-column>
          <el-table-column prop="phone" label="账号" style="width: 180">
          </el-table-column>
          <el-table-column
            prop="created_time"
            label="创建时间"
            style="width: 180"
          >
          </el-table-column>
          <el-table-column label="操作" prop="operation">
            <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEditUser(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row, scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <section v-else>
      <div class="auth">您没有管理员权限</div>
    </section>
  </div>
</template>

<script>
import userService from "@/global/service/user.js";
import DataStore from "@/global/storage/index.js";
export default {
  data() {
    return {
      formTitle: "",
      lock: true,
      formBoxShow: false,
      form: {
        name: "",
        phone: "",
        password: ""
      },
      formLabelWidth: "120px",
      userData: [],
      formIndex: null,
      formBoxId: null
    };
  },
  created: function() {
    userService.list().then(res => {
      this.userData = res.data.data;
    });
    let status = DataStore.getStatus();
    status === 1 ? (this.lock = false) : "";
  },
  methods: {
    newUser() {
      this.formBoxShow = true;
      this.formTitle = "新建用户";
      this.form.name = "";
      this.form.phone = "";
      this.form.password = "";
    },
    handleEditUser(index, row) {
      this.formBoxShow = true;
      this.formTitle = "修改用户";
      this.form.name = row.name;
      this.form.phone = row.phone;
      this.form.password = row.password;
      this.formBoxId = row.id;
      this.formIndex = index;
    },
    handleSave() {
      this.formBoxShow = false;
      let name = this.form.name;
      let phone = this.form.phone;
      let password = this.form.password;
      let index = this.formIndex;
      let id = this.formBoxId;
      let data = { name, phone, password };
      if (!name || !phone || !password) {
        this.$message.error("缺少必要参数");
        return;
      }
      if (id) {
        userService.update(id, data).then(res => {
          if (res.data.code == 200) {
            this.userData[index].name = name;
            this.userData[index].phone = phone;
            this.userData[index].password = password;
            this.formBoxShow = false;
            this.$message.success("修改成功");
          } else {
            this.$message.error("内部错误");
          }
        });
      } else {
        userService.insert(data).then(res => {
          if (res.data.code == 200) {
            let id = res.data.data;
            data.id = id;
            this.userData.push(data);
            this.$message.success("添加成功");
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    handleDelete(data, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userService.delete(data.id).then(res => {
            if (res.data.code == 200) {
              this.userData.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "info",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.table-container {
  box-sizing: border-box;
  padding: 15px;
  background: #fff;
}
.el-button--medium.is-round {
  margin: 10px;
}
.widther {
  width: 50%;
}
</style>
