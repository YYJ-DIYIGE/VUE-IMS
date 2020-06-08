import AccountLogin from "@/components/AccountLogin.vue";
import Error404 from "@/components/Error404.vue";
const ArticleShow = () =>
  import(/* webpackChunkName: "articleShow" */ "@/components/ArticleShow.vue");

export default [
  {
    path: "/login",
    component: AccountLogin,
    name: "AccountLogin"
  },
  {
    path: "/index",
    name: "ArticleShow",
    component: ArticleShow
  },
  {
    path: "/404",
    name: "Error404",
    component: Error404
  },
  {
    path: "*",
    redirect: { name: "Error404" }
  }
];
