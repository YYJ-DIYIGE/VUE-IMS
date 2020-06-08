<template>
  <div class="container">
    <el-button type="primary" size="medium" round @click="newArticle"
      >新建文章</el-button
    >
    <div class="table-container" style="width: 100%">
      <el-table :data="articleData" style="width: 100%">
        <el-table-column prop="id" label="index" style="width: 180">
        </el-table-column>
        <el-table-column prop="title" label="标题" style="width: 180">
        </el-table-column>
        <el-table-column prop="name" label="分类" style="width: 180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="reviseArticle(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
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
import articleService from "@/global/service/article.js";
export default {
  data() {
    return {
      articleData: []
    };
  },
  created: function() {
    articleService.list().then(res => {
      this.articleData = res.data.data;
    });
  },
  methods: {
    newArticle() {
      this.$router.push({ name: "ArticleCreate" });
    },
    reviseArticle(data) {
      this.$router.push({
        name: "ArticleEdit",
        params: { id: data.id }
      });
    },
    handleDelete(data, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          articleService.delete(data.id).then(res => {
            if (res.data.code == 200) {
              this.articleData.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            } else {
              this.$message({
                type: "info",
                message: "删除失败"
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
</style>
