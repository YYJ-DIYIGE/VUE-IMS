<template>
  <div class="container">
    <el-button type="primary" size="medium" round @click="handleAddClassify"
      >新建分类</el-button
    >
    <el-dialog :title="formTitle" :visible.sync="formBoxShow">
      <el-form :model="form">
        <el-form-item
          class="widther"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formBoxShow = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
    <div class="table-container">
      <el-table :data="classifyData" style="width: 100%">
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="name" label="分类名称"> </el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEditClassify(scope.$index, scope.row)"
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
  </div>
</template>

<script>
import classifyService from "@/global/service/classify.js";
export default {
  data() {
    return {
      formTitle: "",
      classifyIndex: null,
      classifyID: null,
      formLabelWidth: "120px",
      classifyData: [],
      formBoxShow: false,
      form: {
        name: ""
      }
    };
  },
  created: function() {
    classifyService.list().then(res => {
      this.classifyData = res.data.data;
    });
  },
  methods: {
    handleAddClassify() {
      this.formBoxShow = true;
      this.formTitle = "新建分类";
      this.form.name = "";
    },
    handleEditClassify(index, row) {
      this.formBoxShow = true;
      this.formTitle = "编辑分类";
      this.classifyIndex = index;
      this.form.name = row.name;
      this.classifyID = row.id;
    },
    handleSave() {
      let id = this.classifyID;
      let index = this.classifyIndex;
      let name = this.form.name;
      let params = { name };
      if (!name) {
        this.$message.error("缺少重要参数");
        return;
      }
      if (id) {
        classifyService.update(id, params).then(res => {
          if (res.data.code == 200) {
            this.classifyData[index].name = name;
            this.formBoxShow = false;
            this.$message.success("修改成功");
          } else {
            this.formBoxShow = false;
            this.$message.error("内部错误");
          }
        });
      } else {
        classifyService.insert(params).then(res => {
          if (res.data.code == 200) {
            let id = res.data.data;
            params.id = id;
            this.classifyData.push(params);
            this.formBoxShow = false;
            this.$message.success("添加成功");
          } else {
            this.formBoxShow = false;
            this.$message.error("内部错误");
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
          classifyService.delete(data.id).then(res => {
            if (res.data.code == 200) {
              this.classifyData.splice(index, 1);
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
