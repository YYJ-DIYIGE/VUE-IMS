<template>
  <div class="container">
    <div class="pg-main-header">
      <!-- <router-link to="/article">返回文章列表</router-link> -->
      <el-button type="primary" @click="() => this.$router.back()"
        >返回文章列表</el-button
      >
    </div>
    <div class="pg-main-body">
      <el-form class="form-container">
        <el-form-item label="标题" label-width="60px">
          <el-input name="title" v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="60px">
          <el-select placeholder="请选择" v-model="article.classify_id">
            <el-option
              v-for="item in classify"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" label-width="60px">
          <quill-editor
            class="quill-editor"
            v-model="article.content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
        </el-form-item>
        <el-form-item label-width="60px">
          <el-button type="primary" @click="handleAdd">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import articleModel from "@/global/service/article.js";
import classifyModel from "@/global/service/classify.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import hljs from "highlight.js";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      article: {
        title: "",
        id: null,
        content: "",
        classify_id: ""
      },
      classify: [],
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  created() {
    let id = this.$route.params.id;
    articleModel.item(id).then(res => {
      this.article = res.data.data;
    });
    classifyModel.list().then(res => {
      this.classify = res.data.data;
    });
  },
  methods: {
    handleAdd() {
      let id = this.$route.params.id;
      let title = this.article.title;
      let classify_id = this.article.classify_id;
      let content = this.article.content;
      let params = { title, classify_id, content };
      if (!title || !classify_id || !content) {
        this.$message.error("缺少必要参数");
        return;
      }
      articleModel.update(id, params).then(res => {
        if (res.data.code == 200) {
          this.$router.replace({ name: "Article" });
          this.$message.success("修改成功");
        } else {
          this.$router.replace({ name: "ArticleEdit" });
          this.$message.success("修改失败");
        }
      });
    }
  },
  components: {
    "quill-editor": quillEditor
  }
};
</script>

<style lang="less">
.pg-main-header {
  margin: 10px;
}
.pg-main-body {
  margin-top: 20px;
  .form-container {
    width: 80%;
  }
  .quill-editor {
    line-height: 24px;
  }
}
</style>
