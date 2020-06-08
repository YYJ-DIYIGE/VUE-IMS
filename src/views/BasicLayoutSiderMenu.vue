<template>
  <el-menu :default-active="path" :router="true">
    <template v-for="route in filterRoutes">
      <el-menu-item
        :key="route.path"
        :disabled="route.disabled"
        :index="route.path"
        :route="{ path: route.path }"
        :id="route.name"
      >
        <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
        <span slot="title">{{ route.meta.nav.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import routes from "@/router/routesPermission";
import DataStore from "@/global/storage/index";

export default {
  data() {
    return {
      path: this.$route.path,
      filterRoutes: []
    };
  },
  created() {
    this.getRoutes();
  },
  watch: {
    $route(to) {
      this.path = to.path;
    }
  },
  methods: {
    getRoutes() {
      this.filterRoutes = this.filterNavigator(routes);
    },
    filterNavigator(node) {
      let result = [];
      node.forEach(data => {
        if (data.meta && data.meta.nav) {
          let item = {
            path: data.path,
            name: data.name,
            meta: data.meta
          };
          if (data.children) {
            item.children = this.filterNavigator(data.children);
          }
          if (item.name === "User") {
            let status = DataStore.getStatus();
            status == 1 ? result.push(item) : "";
            return;
          }
          result.push(item);
        } else if (data.children) {
          this.filterNavigator(data.children).forEach(item =>
            result.push(item)
          );
        }
      });
      return result;
    },
    hasNavChildren(route) {
      const children = route.children || [];
      return children.some(data => data.meta && data.meta.nav);
    }
  }
};
</script>

<style lang="less">
.el-menu {
  border-right: none;
}
</style>
