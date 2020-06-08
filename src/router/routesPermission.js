const ArticleCreate = () =>
  import(/* webpackChunkName: "article" */ "@/components/ArticleCreate.vue");
const ArticleEdit = () =>
  import(/* webpackChunkName: "article" */ "@/components/ArticleEdit.vue");
const User = () =>
  import(/* webpackChunkName: "user" */ "@/components/User.vue");
const Classify = () =>
  import(/* webpackChunkName: "classify" */ "@/components/classify.vue");
const Article = () =>
  import(/* webpackChunkName: "article" */ "@/components/Article.vue");
import BasicLayout from "@/views/BasicLayout.vue";

export default [
  {
    path: "/",
    name: "Root",
    component: BasicLayout,
    redirect: { name: "ArticleRoot" },
    children: [
      {
        path: "/article",
        name: "ArticleRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-setting",
            title: "文章管理"
          }
        },
        children: [
          {
            path: "/article",
            name: "Article",
            component: Article,
            meta: {
              nav: {
                icon: "el-icon-office-building",
                title: "所有文章"
              },
              breadcrumb: {
                title: "所有文章"
              }
            }
          },
          {
            path: "/article/create",
            name: "ArticleCreate",
            component: ArticleCreate,
            meta: {
              nav: {
                icon: "el-icon-document-add",
                title: "新建文章"
              },
              breadcrumb: {
                title: "新建文章"
              }
            }
          },
          {
            path: "/article/edit/:id",
            name: "ArticleEdit",
            component: ArticleEdit,
            meta: {
              nav: {
                icon: "el-icon-document-add",
                title: "修改文章"
              },
              breadcrumb: {
                title: "修改文章"
              }
            }
          }
        ]
      },
      {
        path: "/classify",
        name: "Classify",
        component: Classify,
        meta: {
          nav: {
            icon: "el-icon-setting",
            title: "分类管理"
          },
          breadcrumb: {
            title: "所有分类"
          }
        }
      },
      {
        path: "/user",
        name: "User",
        component: User,
        meta: {
          nav: {
            icon: "el-icon-setting",
            title: "用户管理"
          },
          breadcrumb: {
            title: "用户管理",
            reqlace: true
          }
        }
      }
    ]
  }
];
