import Vue from "vue";
import Router from "vue-router";
import routes from "./routes.js";
import NProgress from "nprogress";
import DataStore from "@/global/storage/index.js";
import "nprogress/nprogress.css";
Vue.use(Router);

const appRouter = new Router({
  mode: "history",
  routes: routes
});

appRouter.beforeEach(async (to, from, next) => {
  NProgress.start();
  let hasToken = DataStore.getToken("token") ? true : false;
  if (to.name === "AccountLogin" && hasToken) {
    next({ name: "Article" });
  }
  if (to.name !== "AccountLogin" && !hasToken && to.name !== "ArticleShow") {
    next({ name: "AccountLogin" });
  }
  next();
});

appRouter.afterEach(() => {
  NProgress.done();
});

export default appRouter;
